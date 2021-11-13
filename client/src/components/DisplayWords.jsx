import React from 'react'

const DisplayWords = ({ words, player }) => {

    const getTypedWords = (words, player) => {
        let typedWords = words.slice(0, player.currentWordIndex);
        typedWords = typedWords.join(" ");
        return <><span style={{ "backgroundColor": "#34eb77" }}>{typedWords} </span></>
    }
    
    const getCurrentWord = (words, player) => {
        return <><span style={{ "textDecoration": "underline" }}>{words[player.currentWordIndex]} </span></>
    }
    
    const getWordsLeft = (words, player) => {
        let wordsLeft = words.slice(player.currentWordIndex + 1, words.length);
        wordsLeft = wordsLeft.join(" ");
        return <><span>{wordsLeft}</span></>
    }

    return (
        <>

            {getTypedWords(words,player)}
            {getCurrentWord(words,player)}
            {getWordsLeft(words,player)}
        </>
    )
}

export default DisplayWords
