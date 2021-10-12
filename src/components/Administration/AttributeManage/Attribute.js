import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import axios from "axios";
import cs from "../../../const";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Snackbar";
import Pagin from "../../shared/Pagin";

const getAttributeDataUrl = cs.BaseURL + "/api/manager/attribute/list?";

const ITEMS_PER_PAGE = 100;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "60vw",
    minWidth: "50em",
    maxHeight: "95vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #888",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Attribute = ({ t, i18n, history }) => {
  const classes = useStyles();

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // console.log(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [openModal, setOpenModal] = useState(true);
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const [attributeList, setAttributeList] = useState([]);

  const loadAttributeData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${getAttributeDataUrl}page=${currentPage}&size=${ITEMS_PER_PAGE}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      })
      // console.log("attrbute-list", response.data);
      setAttributeList(response.data.data);
      setTotalCount(response.data.total_count)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAttributeData();
  }, [currentPage])

  return <div className="container-fluid w-80vw minw-80em my-3">
    <div className="card card-body shadow">
      <div className="d-flex flex-row py-3">
        <h4 className="fw-bold">{t("attribute.attribute_list")}</h4>
        <div className="ms-auto">
          <button
            className="btn btn-danger"
            onClick={() => { history.push("/attribute/config") }}
          >
            {t("attribute.tabs.config_attribute")}
          </button>
        </div>
      </div>
      <table className="table table-sm table-striped table-hover table-bordered">
        <thead
          className="text-white"
          style={{
            backgroundColor: "#F69756",
            fontSize: "15px",
            color: "black",
          }}
        >
          <tr>
            <th className="" style={{ width: "5%" }} scope="col">#</th>
            <th className="">{t("attribute.fields.attribute_eng_name")}</th>
            <th className="">{t("attribute.fields.attribute_eng_name")}</th>
          </tr>
        </thead>
        <tbody>
          {attributeList.map((item, index) => <tr key={item}>
            <td>{ITEMS_PER_PAGE * (currentPage - 1) + index + 1}</td>
            <td>{item.attributeEngName}</td>
            <td>{item.attributeViName}</td>
          </tr>
          )}
          {!attributeList.length && <tr> <td colSpan={5}>{t("commons.no_data")}</td></tr>}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <Pagin
          ItemsPerPage={ITEMS_PER_PAGE}
          paginate={paginate}
          totalItems={totalCount}
          currentPage={currentPage}
        />
      </div>
    </div>
  </div>
}

export default withTranslation()(Attribute);