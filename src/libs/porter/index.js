import * as PORTER_CONST from "./const";

export class Porter {

    stemAll(words) {
        return words.map(word => this.stem(word));
    }

    stem(word) {

        const wordParts = this.findWordParts(word);
        const stemmedWord = this.stemByWordParts(wordParts).word;

        return stemmedWord
    }

    stemByWordParts(data) {

        let reversed_word = data.reversed_word;
        let RV = data.RV;
        let R2 = data.R2;
        const sortByLength = (a, b) => a.length >= b.length ? -1 : 1;
        const perfective_gerund = PORTER_CONST.PERFECTIVE_GERUND.sort(sortByLength);
        const reflexive = PORTER_CONST.REFLEXIVE.sort(sortByLength);
        const adjective = PORTER_CONST.ADJECTIVE.sort(sortByLength);
        const participle = PORTER_CONST.PARTICIPLE.sort(sortByLength);
        const verb = PORTER_CONST.VERB.sort(sortByLength);
        const noun = PORTER_CONST.NOUN.sort(sortByLength);
        const derivational = PORTER_CONST.DERIVATIONAL.sort(sortByLength);
        const superlative = PORTER_CONST.SUPERLATIVE.sort(sortByLength);

        let haveReflexive = false;
        let haveAdjective = false;

        for (let i = 0; i <= perfective_gerund.length - 1; i++) {
            let ending = this.reverse_word(perfective_gerund[i])

            if (reversed_word.slice(0, ending.length) === ending) {
                reversed_word = reversed_word.replace(ending, "");
                return Object.assign({}, data, {
                    reversed_word,
                    word: this.reverse_word(reversed_word)
                });
            }
        }

        for (let i = 0; i <= reflexive.length - 1; i++) {
            let ending = this.reverse_word(reflexive[i]);

            if (RV.slice(0, ending.length) === ending) {
                RV = RV.replace(ending, "")
                reversed_word = reversed_word.replace(ending, "");
                haveReflexive = true;
                break;
            }
        }

        for (let i = 0; i <= adjective.length - 1; i++) {
            let ending = this.reverse_word(adjective[i]);

            if (RV.slice(0, ending.length) === ending) {
                RV = RV.replace(ending, "")
                reversed_word = reversed_word.replace(ending, "");
                haveAdjective = true;
                break;
            }
        }

        for (let i = 0; i <= participle.length - 1; i++) {
            let ending = this.reverse_word(participle[i]);

            if (RV.slice(0, ending.length) === ending) {
                RV = RV.replace(ending, "")
                reversed_word = reversed_word.replace(ending, "");
                break;
            }
        }

        if (haveAdjective) return Object.assign({}, data, {
            RV,
            reversed_word,
            word: this.reverse_word(reversed_word)
        });

        for (let i = 0; i <= verb.length - 1; i++) {
            let ending = this.reverse_word(verb[i]);

            if (RV.slice(0, ending.length) === ending) {
                RV = RV.replace(ending, "")
                reversed_word = reversed_word.replace(ending, "");
                break;
            }
        }

        if (!haveReflexive) {
            for (let i = 0; i <= noun.length - 1; i++) {
                let ending = this.reverse_word(noun[i])

                if (reversed_word.slice(0, ending.length) === ending) {
                    RV = RV.replace(ending, "")
                    reversed_word = reversed_word.replace(ending, "");
                    break;
                }
            }
        }

        if (reversed_word[0] === 'и') {
            reversed_word = reversed_word.slice(1, reversed_word.length - 1)
        }

        for (let i = 0; i <= derivational.length - 1; i++) {
            let ending = this.reverse_word(derivational[i])

            if (R2.slice(0, ending.length) === ending) {
                reversed_word = reversed_word.replace(ending, "");
                break;
            }
        }

        if (R2) {
            for (let i = 0; i <= derivational.length - 1; i++) {
                let ending = this.reverse_word(derivational[i])

                if (R2.slice(0, ending.length) === ending) {
                    reversed_word = reversed_word.replace(ending, "");
                    break;
                }
            }
        }

        const extendedSL = superlative.concat(['н', 'ь'])
        for (let i = 0; i <= extendedSL.length - 1; i++) {
            let ending = this.reverse_word(extendedSL[i])

            if (R2.slice(0, ending.length) === ending) {
                reversed_word = reversed_word.replace(ending, "");
                break;
            }
        }

        return Object.assign({}, data, {
            RV,
            reversed_word,
            word: this.reverse_word(reversed_word)
        });

    }

    findWordParts(word) {

        let reversed_word = this.reverse_word(word);
        const first_volwe = Math.max(...PORTER_CONST.VOWELS.map((vowel) => {
            if (reversed_word.indexOf(vowel) !== -1) return reversed_word.indexOf(vowel);
            return 0
        }));

        const RV = reversed_word.substr(0, first_volwe);
        const R1Index = Math.min(...PORTER_CONST.CONSONANTS.map((consonant) => {
            if (RV.indexOf(consonant) !== -1) return reversed_word.indexOf(consonant);
            return first_volwe;
        }));

        const R1 = reversed_word.substr(R1Index, first_volwe - 1);
        const R2Index = Math.max(...PORTER_CONST.VOWELS.map((vowel) => {
            if ((RV.indexOf(vowel) !== -1) &&
                (PORTER_CONST.CONSONANTS.includes(RV[RV.indexOf(vowel) + 1]))) return reversed_word.indexOf(vowel) + 1;
            return R1Index;
        }));

        const R2 = reversed_word.substr(R1Index, R2Index);

        return {
            word,
            reversed_word,
            RV,
            R1,
            R2
        }
    }

    reverse_word(word) {
        return word.split("")
            .reverse()
            .join("");
    }
}