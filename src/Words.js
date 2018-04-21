import { AsyncStorage } from 'react-native';

let loadFromRemote = true;

export const listLanguages = async () => {
    const [cached, remote] = (await Promise.all([
        AsyncStorage.getItem("LANGUAGES"),
        makeRequest("words")
    ])).map(x => {
        if (typeof x == "string") x = JSON.parse(x);
        if (x) x.date = new Date(x.date).valueOf();
        return x;
    });

    if (cached && cached.date == remote.date) {
        loadFromRemote = false;
        return cached.languages;
    }

    AsyncStorage.setItem("LANGUAGES", JSON.stringify(remote));

    return remote.languages;
};

export const getWords = async language => {
    return await makeRequest(language);
};

async function makeRequest(item) {
    const resp = await fetch(`https://raw.githubusercontent.com/nohorjo/wordpack/master/words/${item}.json`);
    if (!resp.ok) {
        throw await resp.text();
    }
    return await resp.json();
}