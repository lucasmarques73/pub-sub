const { v4: uuidv4 } = require("uuid");

const PubSub = () => {
  const state = {
    subscriptions: [],
  };

  return {
    subscribe: (topic, callback) => {
      const subscription = { topic, callback, id: uuidv4() };
      state.subscriptions.push(subscription);
      return subscription.id;
    },
    unsubscribe: (id) => {
      state.subscriptions = state.subscriptions.filter(
        (subscription) => subscription.id !== id
      );
    },
    publish: (topic, message) => {
      state.subscriptions.forEach((subscription) => {
        if (subscription.topic === topic) subscription.callback(message);
      });
    },
  };
};

const obs = PubSub();

const sub1 = obs.subscribe("1", (message) => {
  console.log("message", message);
});

const sub2 = obs.subscribe("1", (message) => {
  console.log("other action", message);
});

const sub3 = obs.subscribe("2", (message) => {
  console.log("message", message);
});

obs.publish("1", "log for topic 1");

obs.publish("2", "log for topic 2");

obs.unsubscribe(sub2);

obs.publish("1", "third message for topic 1");
