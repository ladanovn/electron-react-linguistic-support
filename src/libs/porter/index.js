import * as PORTER_CONST from "./const";

export class Porter {

    stemAll(words) {
        return words.map(word => this.stem(word));
    }

    stem(word) {


        const wordParts = this.findWordParts(word);
        // const stemmedWord = this.stemByWordParts(wordParts).word;
        console.log(wordParts)
        return ''
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
        // console.log(this.reverse_word(RV))

        for (let i = 0; i <= perfective_gerund.length - 1; i++) {
            let ending = this.reverse_word(perfective_gerund[i])

            if (RV.slice(0, ending.length) === ending) {
                RV = RV.replace(ending, "")
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

        const RVInd = Math.min(...word.split('').map((symbol, index) => {
            if ((PORTER_CONST.VOWELS.includes(symbol)) && (PORTER_CONST.CONSONANTS.includes(word[index - 1])))
                return index
            else return word.length
        }));

        const RV = word.substr(RVInd + 1, word.length);

        const R1Ind = Math.min(...RV.split('').map((symbol, index) => {
            if ((PORTER_CONST.CONSONANTS.includes(symbol)) && (PORTER_CONST.VOWELS.includes(RV[index - 1])))
                return index
            else return RV.length
        }));

        const R1 = RV.substr(R1Ind + 1, RV.length);

        const R2Ind = Math.min(...R1.split('').map((symbol, index) => {
            if ((PORTER_CONST.CONSONANTS.includes(symbol)) && (PORTER_CONST.VOWELS.includes(R1[index - 1])))
                return index
            else return R1.length
        }));

        const R2 = R1.substr(R2Ind + 1, R1.length);

        return {
            word,
            RV,
            R1,
            R2
        }
    }
}