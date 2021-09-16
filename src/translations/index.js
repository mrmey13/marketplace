import vi from './vi.json'
import en from './en.json'

const resources = {
    en: {
        translation: {
            ...en,
        },
    },
    vi: {
        translation: {
            ...vi,
        },
    },
};

export { vi, en, resources };