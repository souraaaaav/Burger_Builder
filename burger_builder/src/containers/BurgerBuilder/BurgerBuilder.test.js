import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({ adapter: new Adapter() })


describe("<NavigationItems />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} onInitPurchase={()=>{}}/>)
    })
    it("should contain <BuildControls /> when receiving ingredients",()=>{
        wrapper.setProps({ing:{salad:0} })
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})
