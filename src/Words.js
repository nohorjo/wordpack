import { AsyncStorage } from 'react-native';

const KEY_PREFIX = '@wordpack:';

let loadFromRemote = true;
let keys = [];

AsyncStorage.getAllKeys().then(allKeys => keys = allKeys.filter(k => k.startsWith(KEY_PREFIX)));

export const listLanguages = async () => {
    const key = KEY_PREFIX + "LANGUAGES";
    const [cached, remote] = (await Promise.all([
        AsyncStorage.getItem(key),
        makeRequest("words")
    ])).map(x => {
        if (typeof x == "string") x = JSON.parse(x);
        if (x) x.date = new Date(x.date).valueOf();
        return x;
    });

    console.log("cached", cached);
    console.log("remote", remote);

    if (cached && cached.date == remote.date) {
        console.log("Using cached list")
        loadFromRemote = false;
        return cached.languages;
    }

    console.log("Using remote list")
    AsyncStorage.setItem(key, JSON.stringify(remote));

    return remote.languages;
};

export const getWords = async language => {
    console.log(`Loading ${language}`);
    const key = KEY_PREFIX + language;
    if (keys.includes(key) && !loadFromRemote) {
        console.log("Using cached words");
        return JSON.parse(await AsyncStorage.getItem(key));
    }

    console.log("Using remote words");
    const words = await makeRequest(language);
    AsyncStorage.setItem(key, JSON.stringify(words)).then(keys.push.bind(keys, key));

    return words;
};

async function makeRequest(item) {
    const timeout = () => new Promise((resolve, reject) => setTimeout(reject.bind(this, `Request timed out: ${item}`), 5000));
    const request = async () => {
        const resp = await fetch(`https://raw.githubusercontent.com/nohorjo/wordpack/master/words/${item}.json`);
        if (!resp.ok) {
            throw await resp.text();
        }
        return await resp.json();
    };

    return await Promise.race([request(), timeout()]);
}