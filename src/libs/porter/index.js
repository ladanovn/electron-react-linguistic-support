import * as PORTER_CONST from "./const";

const sortByLength = (a, b) => a.length >= b.length ? -1 : 1;
const perfective_gerund = PORTER_CONST.PERFECTIVE_GERUND.sort(sortByLength);
const reflexive = PORTER_CONST.REFLEXIVE.sort(sortByLength);
const adjective = PORTER_CONST.ADJECTIVE.sort(sortByLength);
const participle = PORTER_CONST.PARTICIPLE.sort(sortByLength);
const verb = PORTER_CONST.VERB.sort(sortByLength);
const noun = PORTER_CONST.NOUN.sort(sortByLength);
const derivational = PORTER_CONST.DERIVATIONAL.sort(sortByLength);
const superlative = PORTER_CONST.SUPERLATIVE.sort(sortByLength);

export class Porter {

    stemAll(words) {
        return words.map(word => this.stem(word));
    }

    stem(word) {

        const wordParts = this.findWordParts(word);
        console.log(JSON.parse(JSON.stringify(wordParts)))
        const stemmedWord = this.stemByWordParts(wordParts).word;
        console.log(this.stemByWordParts(wordParts))
        return stemmedWord;
    }

    stemByWordParts(data) {

        let haveReflexive = false;
        let haveAdjective = false;

        this.removeEnding(data, perfective_gerund);

        haveReflexive = this.removeEnding(data, reflexive);
        haveAdjective = this.removeEnding(data, adjective);

        this.removeEnding(data, participle);

        if (haveAdjective)
            return data;

        this.removeEnding(data, verb);

        if (!haveReflexive)
            this.removeEnding(data, noun);

        // Step 2

        if (data.RV.slice(data.RV.length - 1) === 'и') {
            data.RV = data.RV.slice(0, data.RV.length - 1);
            data.word = data.word.slice(0, data.word.length - 1);
        }

        // Step 3

        if (data.R2) {
            for (let i = 0; i <= derivational.length - 1; i++) {
                const ending = derivational[i];

                if (data.R2.slice(data.R2.length - ending.length) === ending) {
                    data.RV = data.RV.slice(0, data.RV.length - ending.length);
                    data.word = data.word.slice(0, data.word.length - ending.length);
                    break;
                }
            }
        }

        // Step 4
        this.removeEnding(data, superlative.concat(['н', 'ь']))

        return data;
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

    removeEnding(data, endings) {
        for (let i = 0; i <= endings.length - 1; i++) {
            const ending = endings[i];

            if (data.RV.slice(data.RV.length - ending.length) === ending) {
                data.RV = data.RV.slice(0, data.RV.length - ending.length);
                data.word = data.word.slice(0, data.word.length - ending.length);

                return true;
            }
        }

        return false;
    }
}