import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new EnzymeAdapter() });

// import { mount } from "enzyme";
// import Calendar from "../Calendar/Calendar";
describe("Calendar", () => {
  // const wrapper = mount(<Calendar />);

  it("should render without crashing", () => {});
});
