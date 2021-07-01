import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems'

configure({ adapter: new Adapter() })

describe("<NavigationItems />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it("should render two  <NavigationItem /> if not authenticated", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it("should render three  <NavigationItem /> if authenticated", () => {
        // wrapper = shallow(<NavigationItems isAuthenticated/>)
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it("should render  <Logout /> if authenticated", () => {
       
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.contains(<NavigationItem link="/logout" >Logout</NavigationItem>)).toEqual(true)
    })
})