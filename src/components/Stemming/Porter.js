import * as PORTER_CONST from "./const";

export class Porter {
    constructor(words) {
        this.words = words;
        // this.allEndings = PORTER_CONST.ADJECTIVE.concat(
        //     PORTER_CONST.DERIVATIONAL,
        //     PORTER_CONST.NOUN,
        //     PORTER_CONST.PARTICIPLE,
        //     PORTER_CONST.PERFECTIVE_GERUND,
        //     PORTER_CONST.REFLEXIVE,
        //     PORTER_CONST.SUPERLATIVE,
        //     PORTER_CONST.VERB
        // ).sort((a, b) => {
        //     return a.length >= b.length ? -1 : 1;
        // });;
    }

    start() {
        return this.words.map(word => {
            return this.stemWord(word);
        });
    }

    static stemWord(stemWord) {

        let word = stemWord
            .split("")
            .reverse()
            .join("");

        const first_volwe = Math.max(...PORTER_CONST.VOWELS.map((vowel) => {
            if (word.indexOf(vowel) !== -1) return word.indexOf(vowel);
            return 0
        }));

        const RV = word.substr(0, first_volwe);

        const R1Index = Math.min(...PORTER_CONST.CONSONANTS.map((consonant) => {
            if (RV.indexOf(consonant) !== -1) return word.indexOf(consonant);
            return first_volwe;
        }));

        const R1 = word.substr(R1Index, first_volwe - 1);

        const R2Index = Math.max(...PORTER_CONST.VOWELS.map((vowel) => {
            if ((RV.indexOf(vowel) !== -1) &&
                (PORTER_CONST.CONSONANTS.includes(RV[RV.indexOf(vowel) + 1]))) return word.indexOf(vowel) + 1;
            return R1Index;
        }));

        const R2 = word.substr(R1Index, R2Index);
        // for (let i = 0; i <= this.allEndings.length - 1; i++) {
        //     let ending = this.allEndings[i]
        //         .split("")
        //         .reverse()
        //         .join("");

        //     if (word.indexOf(ending) !== -1) {
        //         word = word.replace(ending, "");

        //         if (word[0] === 'и') word = word.substr(0, word.length - 1);
        //         // step 3

        //         break;
        //     }
        // }
    }
}