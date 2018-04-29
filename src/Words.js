import { AsyncStorage } from 'react-native';

const KEY_PREFIX = '@wordpack:';

let loadFromCache = [];
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
        return loadFromCache = cached.languages;
    }

    console.log("Using remote list")
    AsyncStorage.setItem(key, JSON.stringify(remote));

    return remote.languages;
};

export const getWords = async language => {
    console.log(`Loading ${language}`);
    const key = KEY_PREFIX + language;
    const cacheRequest = AsyncStorage.getItem(key);

    if (keys.includes(key) && loadFromCache.includes(language)) {
        console.log("Using cached words");
        return JSON.parse(await cacheRequest);
    }

    console.log("Using remote words");
    const [cWords, rWords] = await Promise.all([cacheRequest, makeRequest(language)]);

    if (cWords) {
        rWords.forEach(word => {
            const { learned, weight } = cWords.find(x => x.word == word.word) || {};
            Object.assign(word, { learned, weight });
        });
    }

    AsyncStorage.setItem(key, JSON.stringify(rWords)).then(() => {
        keys.push(key);
        loadFromCache.push(language);
    });

    return rWords;
};

export const saveWords = (words, language) => {
    console.log(`Saving ${language}`);
    const key = KEY_PREFIX + language;
    AsyncStorage.setItem(key, JSON.stringify(words));
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