import { connect } from "react-redux";
import MenuCard from "../components/MenuCard";

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = state => {
  return {};
};

const MenuCardContainer = connect(mapStateToProps, mapDispatchToProps)(
  MenuCard
);

export default MenuCardContainer;
