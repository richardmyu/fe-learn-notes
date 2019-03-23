import HelloWorld from '@/components/HelloWorld'
import {shallowMount} from "@vue/test-utils"

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(HelloWorld);
    // console.log(wrapper.find('h1').text());

    expect(wrapper.find('h1').text()).toBe('hello world')
  })
})
