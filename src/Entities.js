export const listLanguages = () => fetch('/entities/languages.json', {cache: "no-store"})
                                    .then(resp => resp.json());

export const getWords = async language => {
    console.log(`Loading ${language}`);

    const words = await fetch(`/entities/${language}.json`).then(resp => resp.json());
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

export const averageScore = language => {
    const weights = JSON.parse(localStorage.getItem(`${language}_weights`) || '[]').filter(x => x);
    return Math.round(weights.reduce((sum, w) => sum + w, 0) / weights.length);
};

export const getPhrases = lang => fetch(`/entities/${lang}_phrases.json`).then(resp => resp.json()).then(ps => {
    console.log('Loading phrases', lang);

    const learned = JSON.parse(localStorage.getItem(`${lang}_phrases`) || '[]');
    return ps.map((p, i) => ({
        ...p,
        learned: !!learned[i],
    }))
});

export const savePhrases = (phraseData, lang) => {
    console.log('Saving phrases', lang);

    localStorage.setItem(`${lang}_phrases`, JSON.stringify(phraseData.map(p => !!p.learned)));
};
