import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "../elements/SideBar";
import Chet from "../elements/Chet";
import io from "socket.io-client";
import UseSocketlisener from "../../hooksAndFunctions/useSocketListen";
import UseResponsivePage from "../../hooksAndFunctions/userResponsivePage";
import "./css/chetpage.css";

export const socket = io.connect("http://localhost:5000");

function ChetPage() {
  const { user, currentContact, newMessages, currentGroup } =
    UseSocketlisener(socket);

  const { sidbarSize, chetSize, setToggelPage } =
    UseResponsivePage(currentContact);

  const responsiveHandler = (responsive) => {
    setToggelPage(responsive);
  };
  console.log(currentGroup, currentContact);
  return (
    <div className="chet-page">
      <Row>
        {sidbarSize && (
          <Col className="col" sm={4} md={4} lg={3} xl={3} xxl={2}>
            <SideBar
              user={user}
              socketId={socket.id}
              responsiveHandler={responsiveHandler}
              currentGroup={currentGroup}
              newMessages={newMessages}
            />
          </Col>
        )}
        {chetSize && (
          <Col xs={12} sm={8} md={8} lg={9} xl={9} xxl={10}>
            <Chet
              responsiveHandler={responsiveHandler}
              currentContact={currentContact}
              currentGroup={currentGroup}
              user={user}
            />
          </Col>
        )}
      </Row>
    </div>
  );
}

export default ChetPage;
