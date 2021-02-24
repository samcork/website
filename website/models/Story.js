
/** ##################################################################### - DATABASE*/

const storyById = {
  1548428769738: {
    id: "1548428769738",
    title: "Made up story",
    text: "This is my first story!",
    author: "doctorwhocomposer"
  },
  1548428769739: {
    id: "1548428769739",
    title: "The Horse, Hunter, and Stag",
    text: `A quarrel had arisen between the Horse and the Stag, so the Horse came to a Hunter to ask his help to take revenge on the Stag.
            The Hunter agreed, but said: "If you desire to conquer the Stag, you must permit me to place this piece of iron between your jaws, so that I may guide you with these reins, and allow this saddle to be placed upon your back so that I may keep steady upon you as we follow after the enemy."
            The Horse agreed to the conditions, and the Hunter soon saddled and bridled him.
            Then with the aid of the Hunter the Horse soon overcame the Stag, and said to the Hunter: "Now, get off, and remove those things from my mouth and back."
            "Not so fast, friend," said the Hunter. "I have now got you under bit and spur, and prefer to keep you as you are at present."`,
    author: "Aesop"
  },
  1548428769740: {
    id: "1548428769740",
    title: "The Boys and the Frogs Fable",
    text: `Some boys, playing near a pond, saw a number of Frogs in the water, and began to pelt them with stones.

    They killed several of them, when one of the Frogs, lifting his head out of the water, cried out:
    
    "Pray stop, my boys; what is sport to you is death to us."`,
    author: "Aesop"
  },
  1548428769741: {
    id: "1548428769741",
    title: "The Old Hound Fable",
    text: `A Hound, who in the days of his youth and strength had never yielded to any beast of the forest, encountered in his old age a boar in the chase.

    He seized him boldly by the ear, but could not retain his hold because of the decay of his teeth, so that the boar escaped.
    
    His master, quickly coming up, was very much disappointed, and fiercely abused the dog.
    
    The Hound looked up and said: "It was not my fault, master; my spirit was as good as ever, but I could not help mine infirmities. I rather deserve to be praised for what I have been, than to be blamed for what I am."`,
    author: "Aesop"
  },
  1548428769742: {
    id: "1548428769742",
    title: "The Mischievous Dog",
    text: `A Dog used to run up quietly to the heels of those he met, and to bite them without notice.

    His master sometimes suspended a bell about his neck, that he might give notice of his presence wherever he went, and sometimes he fastened a chain about his neck, to which was attached a heavy clog, so that he could not be so quick at biting people's heels.
    
    The Dog grew proud of his bell and clog, and went with them all over the market-place.
    
    An old hound said to him: "Why do you make such an exhibition of yourself? That bell and clog that you carry are not, believe me, orders of merit, but, on the contrary, marks of disgrace, a public notice to all men to avoid you as an ill-mannered dog."`,
    author: "Aesop"
  }
};

const storyIds = ["1548428769738", "1548428769739", "1548428769740", "1548428769741", "1548428769742"];

/** ##################################################################### - DATABASE METHODS*/

module.exports = {
  // Create a story
  createStory({ title, text, author }) {
    return new Promise(resolve => {
      const id = Date.now().toString();
      storyById[id] = {
        id,
        title,
        text,
        author
      };
      storyIds.push(id);
      resolve(storyById[id]);
    });
  },

  // Find All Stories
  findAllStories() {
    return new Promise((resolve, reject) => {
      resolve(storyIds.map(id => storyById[id]));
    });
  },

  // Find stories by criteria
  findStories(search) {
    return new Promise((resolve, reject) => {
      stories = [];
      storyIds.forEach(id => {
        if (storyById[id].title.includes(`${search}`) || storyById[id].author.includes(`${search}`)) {
          stories.push(storyById[id]);
        }
      });
      resolve(stories);
    });
  },

  deleteStory(delTitle) {
    return new Promise((resolve, reject) => {
      storyIds.forEach((id, index) => {
        if (storyById[id].title === `${delTitle}`) {
          var author = storyById[id].author
          delete storyById[id];
          if (index > -1) {
            storyIds.splice(index, 1);
          }
          resolve(author)
        }
      })
      reject("Could not find title");
    })
  }
};