
export const listLanguages = async () => {
    return await makeRequest("words");
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