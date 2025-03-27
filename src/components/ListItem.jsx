import { motion } from "framer-motion";
import { ListGroup } from "react-bootstrap";
import '../css/ListItem.css';

const MotionListGroupItem = motion.create(ListGroup.Item);

const ListItem = ({ item, config, index }) => {
  const {
    title,
    subtitle,
    numericField,
    pfp,
    showIndex,
  } = config;

  return (
    <MotionListGroupItem
      className="custom-list-item d-flex align-items-center justify-content-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="d-flex align-items-center">
        {showIndex && (
          <div className="list-item-index">
            {index + 1}
          </div>
        )}

        {pfp && item[pfp] && (
          <img
            src={item[pfp]}
            alt="pfp"
            className="list-item-avatar"
          />
        )}

        <div>
          {title && item[title] && <h5 className="fw-bold m-0 p-0">{item[title]}</h5>}
          {subtitle && item[subtitle] && (
            <h4 className="subtitle m-0 p-0">{item[subtitle]}</h4>
          )}
        </div>
      </div>

      {numericField && item[numericField] !== undefined && (
        <span className="badge bg-primary rounded-pill">
          {item[numericField]}
        </span>
      )}
    </MotionListGroupItem>
  );
};

export default ListItem;
