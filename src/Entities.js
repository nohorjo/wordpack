import Papa from 'papaparse';

import { setItem } from "./utils";

export const listLanguages = () => fetch('/entities/languages.json', {cache: "no-store"})
                                    .then(resp => resp.json());

export const getWords = async language => {
    console.log(`Loading ${language}`);

    let words;
    if (language === 'classical arabic') {
        try {
            words = await new Promise((resolve, reject) => {
                Papa.parse('https://docs.google.com/spreadsheets/d/13qeJ4lOjgDuK2g6EMJlAN6JNaVSNayfi_eH0Pg85cWs/export?format=csv', {
                    download: true,
                    header: true,
                    complete: results => resolve(results.data),
                    error: reject,
                });
            });
            localStorage.setItem('classical_arabic_words', JSON.stringify(words));
        } catch (e) {
            words = JSON.parse(localStorage.getItem('classical_arabic_words'));
        }
    } else {
        words = await fetch(`/entities/${language}.json`).then(resp => resp.json());
    }

    const weights = JSON.parse(localStorage.getItem(`${encodeURIComponent(language)}_weights`) || '[]');

    return words.map((w, i) => ({
        ...w,
        weight: weights[i] || 0,
    }));
};

export const saveWords = (words, language) => {
    console.log(`Saving ${language}`);
    setItem(`${language}_weights`, JSON.stringify(words.map(w => w.weight || 0)));
};

export const getProgess = language => {
    const weights = JSON.parse(localStorage.getItem(`${encodeURIComponent(language)}_weights`) || '[]');
    
    return ((weights.filter(w => w).length/weights.length) || 0) * 100;
};

export const averageScore = language => {
    let weights = JSON.parse(localStorage.getItem(`${encodeURIComponent(language)}_weights`) || '[]')
        .filter(x => x)
        .sort()
        .reverse();
    weights = weights.slice(Math.round(weights.length / 4));
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

    setItem(`${lang}_phrases`, JSON.stringify(phraseData.map(p => !!p.learned)));
};
