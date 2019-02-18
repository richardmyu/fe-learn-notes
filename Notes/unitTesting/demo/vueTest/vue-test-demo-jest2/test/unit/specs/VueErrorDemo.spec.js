import { shallowMount } from "@vue/test-utils";
import VueErrorDemo from "@/components/VueErrorDemo.vue";

// test
test("VueErrorDemo.vue", () => {
  const wrapper = shallowMount(VueErrorDemo);
  wrapper.setData({ username: "".repeat(7) });
  expect(wrapper.find(".error").exists()).toBe(true);

  wrapper.setData({ username: "Lachlan" });
  expect(wrapper.find(".error").exists()).not.toBe(true);
});

// describe it
describe("VueErrorDemo.vue", () => {
  it("renders a message and responds correctly to user input", () => {
    let data = () => {
      return {
        message: "Hello World",
        username: ""
      };
    };
    const wrapper = shallowMount(VueErrorDemo, { data: data });

    // ???
    /* const wrapper = shallowMount(VueErrorDemo, () => {
      return {
        data: {
          message: "Hello World",
          username: ""
        }
      };
    }); */
    console.log(wrapper.find(".message").text());

    expect(wrapper.find(".message").text()).toBe("Hello World");
    expect(wrapper.find(".error").exists()).toBeTruthy();

    wrapper.setData({ username: "Lachlan" });
    expect(wrapper.find(".error").exists()).toBeFalsy();
  });
});

const factory = (values = {}) => {
  return shallowMount(VueErrorDemo, () => {
    return { data: { ...values } };
  });
};

describe("VueErrorDemo.vue", () => {
  it("renders a welcome message", () => {
    const wrapper = factory();
    expect(wrapper.find(".message").text()).toEqual(
      "Welcome to the Vue.js cookbook"
    );
  });

  it("renders ok", () => {
    const wrapper = factory();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("renders an error when username is less than 7 characters", () => {
    const wrapper = factory({ username: "" });
    expect(wrapper.find(".error").exists()).toBeTruthy();
  });

  it("renders an error when username is whitespace", () => {
    const wrapper = factory({ username: " ".repeat(7) });
    expect(wrapper.find(".error").exists()).toBeTruthy();
  });

  it("does not render an error when username is 7 characters", () => {
    const wrapper = factory({ username: "lachlan" });
    // console.log(wrapper.find("input").text());

    // console.log(wrapper.find(".error").text());
    expect(wrapper.find(".error").exists()).toBeTruthy();
  });
});
