import { shallowMount } from "@vue/test-utils";
import MessageToggle from "@/components/MessageToggle.vue";
import Message from "@/components/Message.vue";

describe("Message.vue", () => {
  it("toggles msg passed to Message when button is clicked", () => {
    const wrapper = shallowMount(MessageToggle);
    // console.log(wrapper);
    console.log(wrapper.vm.msg);

    const button = wrapper.find("#toggle-message");
    console.log(wrapper.vm.msg);
    // console.log(button);

    button.trigger("click");

    const MessageComponent = wrapper.find(Message);
    expect(MessageComponent.props()).toEqual({ msg: "message" });
    button.trigger("click");
    expect(MessageComponent.props()).toEqual({ msg: "toggled message" });
  });
});
