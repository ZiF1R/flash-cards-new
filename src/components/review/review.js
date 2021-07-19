const splitCards = (deck) => {
  let newCards = [],
    oldCards = [];

  for (let i = 0; i < deck.length; i++) {
    if (deck[i].review.right === 0 && deck[i].review.wrong === 0)
      newCards.push(deck[i]);
    else oldCards.push(deck[i]);
  }
  return [newCards, oldCards];
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const createDeck = (deck, size) => {
  let [newCards, oldCards] = splitCards(deck);

  function calcPercentageAnswers(i) {
    let wrongAnswers = oldCards[i].review.wrong,
      rightAnswers = oldCards[i].review.right,
      totalAnswers = rightAnswers + wrongAnswers;

    return ~~(Number(wrongAnswers / totalAnswers || 0) * 100);
  }

  for (let i = 0; i < oldCards.length - 1; i++)
    for (let j = 0; j < oldCards.length - i - 1; j++) {
      if (calcPercentageAnswers(j) < calcPercentageAnswers(j + 1))
        [oldCards[j], oldCards[j + 1]] = [oldCards[j + 1], oldCards[j]];
    }

  deck = [...newCards, ...oldCards];
  if (size < deck.length) deck = deck.slice(0, size);

  deck = shuffleDeck(deck);
  return deck;
};

export const _review = { createDeck };
