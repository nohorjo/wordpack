export const listLanguages = () => fetch('/words/words.json')
                                    .then(resp => resp.json())
                                    .then(langs => langs.sort());

export const getWords = async language => {
    console.log(`Loading ${language}`);

    const words = await fetch(`/words/${language}.json`).then(resp => resp.json());
    const weights = JSON.parse(localStorage.getItem(`${language}_weights`) || '[]');

    return words.map((w, i) => ({
        ...w,
        weight: weights[i] || 0,
    }));
};

export const saveWords = (words, language) => {
    console.log(`Saving ${language}`);
    localStorage.setItem(`${language}_weights`, JSON.stringify(words.map(w => w.weight || 0)));
};

export const getProgess = language => {
    const weights = JSON.parse(localStorage.getItem(`${language}_weights`) || '[]');
    
    return ((weights.filter(w => w).length/weights.length) || 0) * 100;
};
