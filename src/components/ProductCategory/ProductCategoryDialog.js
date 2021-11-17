import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation, withTranslation } from 'react-i18next';
import { withToastManager } from 'react-toast-notifications';
import { Link, withRouter, Route } from 'react-router-dom';
import color from '../../theme/color';
import cs from '../../const';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios';

const productCategoryUrl = cs.BaseURL + '/api/common/product/category/list';

const styles = (theme) => ({
  categorySelectorWrap: {
    marginBottom: '36px',
    padding: '24px',
    backgroundColor: '#fafafa',
  },
  categoryList: {
    left: '0%',
    // width: "1500px",
    position: 'relative',
    display: 'flex',
    marginTop: '16px',
    padding: '10px 0',
    backgroundColor: '#ffffff',
    transition: 'left .5s ease',
  },
  scrollItem: {
    flex: '1',
    height: '320px',
    borderLeft: '1px solid #fff',
    overflowY: 'scroll',
    listStyle: 'none',
    paddingLeft: '0',
  },
  categoryItem: {
    display: 'flex',
    padding: '0 16px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
      background: '#f6f6f6',
    },
    '&.selected': {
      color: color.seabuckthorn,
    },
  },
  categoryItemRight: {
    flexShrink: 0,
    display: '-webkit-box',
    '-webkit-box-align': 'center',
  },

  SelectedCategoryItem: {
    color: color.seabuckthorn,
  },
  textOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginTop: 'revert',
  },

  textOverflowSelected: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginTop: 'revert',
    color: color.seabuckthorn,
  },
  notAllowedTag: {
    padding: '3px 4px',
    borderRadius: '2px',
    background: '#f6f6f6',
    color: '#b7b7b7',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '12px',
  },
});

export const CHARACTER_LIMIT = 120;

class ProductCategoryDialog extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.state = {
      productName: props.location.state ? props.location.state.productName : '',
      categoryName: '',
      categoryId: props.location.state
        ? props.location.state.category.categoryId
        : '',
      category: props.location.state
        ? props.location.state.category
        : {
            categoryId: 0,
            categoryLevel1Id: 0,
            categoryLevel2Id: 0,
            categoryLevel3Id: 0,
            categoryLevel4Id: 0,
            categoryLevel5Id: 0,
            categoryEngPath: '',
            categoryViePath: '',
          },
      valid: false,
      layer1: '',
      layer1Data: [],
      layer2: '',
      layer2Data: [],
      layer3: '',
      layer3Data: [],
      layer4: '',
      layer4Data: [],
      layer5: '',
      layer5Data: [],
    };
    this.tmpData = [];
  }

  componentWillMount() {
    console.log(this.props.history);
    for (let layer = 0; layer <= 4; layer++) {
      this.loadData();
      if (this.state.category[`categoryLevel${layer}Id`]) {
        this.loadData(
          this.state.category[`categoryLevel${layer}Id`],
          layer + 1
        );
      }
    }
  }

  loadData = async (parentId, categoryLevel) => {
    if (!categoryLevel) {
      categoryLevel = 1;
    }
    let url = productCategoryUrl;
    if (parentId) {
      url += `?parentId=${parentId}&categoryLevel=${categoryLevel}`;
    }

    try {
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
      });
      console.log(response.data.data);
      if (response.data.data && response.data.data.length > 0) {
        this.setState({ [`layer${categoryLevel}Data`]: response.data.data });
        if (this.state.category[`categoryLevel${categoryLevel}Id`] !== 0) {
          const tmpItem = this.state[`layer${categoryLevel}Data`].find(
            (item) =>
              item.categoryId ===
              this.state.category[`categoryLevel${categoryLevel}Id`]
          );
          this.setState({
            valid: !tmpItem.hasChildren,
            [`layer${categoryLevel}`]: tmpItem,
          });
        }

        if (categoryLevel === 1) {
          this.tmpData = response.data.data;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleCategory = (layer, item) => {
    switch (layer) {
      case 1:
        this.setState({
          valid: !item.hasChildren,
          category: {
            categoryId: item.categoryId,
            categoryLevel1Id: item.categoryId,
          },
          layer1: item,
        });
        break;
      case 2:
        this.setState({
          valid: !item.hasChildren,
          category: {
            categoryId: item.categoryId,
            categoryLevel2Id: item.categoryId,
          },
          layer2: item,
        });
        break;
      case 3:
        this.setState({
          valid: !item.hasChildren,
          category: {
            categoryId: item.categoryId,
            categoryLevel3Id: item.categoryId,
          },
          layer3: item,
        });
        break;
      case 4:
        this.setState({
          valid: !item.hasChildren,
          category: {
            categoryId: item.categoryId,
            categoryLevel4Id: item.categoryId,
          },
          layer4: item,
        });
        break;
      case 5:
        this.setState({
          valid: !item.hasChildren,
          category: {
            categoryId: item.categoryId,
            categoryLevel5Id: item.categoryId,
          },
          layer5: item,
        });
        break;
      default:
        break;
    }
    if (layer !== 5 && item.hasChildren) {
      this.loadData(item.categoryId, layer + 1);
    }
    if (!item.hasChildren) {
      this.setState({ categoryId: item.categoryId });
    }
  };

  handleOnClick = (item) => {
    this.props.handleClose();
    this.props.history.push(
      '/category/' + item.categoryEngName + '/' + item.categoryId
    );
  };

  render() {
    const { classes, t, i18n } = this.props;
    if (
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.reload
    ) {
      this.props.history.location.state.reload = false;
      this.loadData();
    }

    return (
      <Dialog
        open={this.props.handleOpen}
        aria-labelledby="draggable-dialog-title"
        maxWidth="md"
        fullWidth
        onClose={() => this.props.handleClose()}
      >
        <DialogTitle>Product Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Product Category</DialogContentText>
          <div className={classes.categoryList}>
            <ul className={classes.scrollItem}>
              {this.state.layer1Data.map((item) => (
                <li
                  className={classes.categoryItem}
                  id={item.categoryId}
                  data-id={item.categoryId}
                  onMouseEnter={() => this.handleCategory(1, item)}
                  onClick={() => this.handleOnClick(item)}
                >
                  <p
                    className={
                      item.categoryId == this.state.layer1.categoryId
                        ? classes.textOverflowSelected
                        : classes.textOverflow
                    }
                  >
                    {i18n.language === 'en'
                      ? item.categoryEngName
                      : item.categoryVieName}
                  </p>

                  <div className={classes.categoryItemRight}>
                    {item.hasChildren && <ChevronRightIcon />}
                  </div>
                </li>
              ))}
            </ul>

            <ul className={classes.scrollItem}>
              {this.state.layer2Data &&
                this.state.layer2Data.map((item) => (
                  <li
                    className={classes.categoryItem}
                    id={item.categoryId}
                    data-id={item.categoryId}
                    onMouseEnter={() => this.handleCategory(2, item)}
                    onClick={() => this.handleOnClick(item)}
                  >
                    <p
                      className={
                        item.categoryId == this.state.layer2.categoryId
                          ? classes.textOverflowSelected
                          : classes.textOverflow
                      }
                    >
                      {i18n.language === 'en'
                        ? item.categoryEngName
                        : item.categoryVieName}
                    </p>
                    <div className={classes.categoryItemRight}>
                      {item.hasChildren && <ChevronRightIcon />}
                    </div>
                  </li>
                ))}
            </ul>

            <ul className={classes.scrollItem}>
              {this.state.layer3Data &&
                this.state.layer3Data.map((item) => (
                  <li
                    className={classes.categoryItem}
                    id={item.categoryId}
                    data-id={item.categoryId}
                    onMouseEnter={() => this.handleCategory(3, item)}
                    onClick={() => this.handleOnClick(item)}
                  >
                    <p
                      className={
                        item.categoryId == this.state.layer3.categoryId
                          ? classes.textOverflowSelected
                          : classes.textOverflow
                      }
                    >
                      {i18n.language === 'en'
                        ? item.categoryEngName
                        : item.categoryVieName}
                    </p>
                    <div className={classes.categoryItemRight}>
                      {item.hasChildren && <ChevronRightIcon />}
                    </div>
                  </li>
                ))}
            </ul>

            <ul className={classes.scrollItem}>
              {this.state.layer4Data &&
                this.state.layer4Data.map((item) => (
                  <li
                    className={classes.categoryItem}
                    id={item.categoryId}
                    data-id={item.categoryId}
                    onMouseEnter={() => this.handleCategory(4, item)}
                    onClick={() => this.handleOnClick(item)}
                  >
                    <p
                      className={
                        item.categoryId == this.state.layer4.categoryId
                          ? classes.textOverflowSelected
                          : classes.textOverflow
                      }
                    >
                      {i18n.language === 'en'
                        ? item.categoryEngName
                        : item.categoryVieName}
                    </p>
                    <div className={classes.categoryItemRight}>
                      {item.hasChildren && <ChevronRightIcon />}
                    </div>
                  </li>
                ))}
            </ul>

            <ul className={classes.scrollItem}>
              {this.state.layer5Data &&
                this.state.layer5Data.map((item) => (
                  <li
                    className={classes.categoryItem}
                    id={item.categoryId}
                    data-id={item.categoryId}
                    onMouseEnter={() => this.handleCategory(5, item)}
                    onClick={() => this.handleOnClick(item)}
                  >
                    <p
                      className={
                        item.categoryId === this.state.layer5.categoryId
                          ? classes.textOverflowSelected
                          : classes.textOverflow
                      }
                    >
                      {i18n.language === 'en'
                        ? item.categoryEngName
                        : item.categoryVieName}
                    </p>
                    <div className={classes.categoryItemRight}>
                      {item.hasChildren && <ChevronRightIcon />}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button
            onClick={() => this.props.handleClose()}
            autoFocus
            color="secondary"
          >
            Hủy
          </Button> */}
          {/* <Button onClick={handleSubmit} color="primary">
                    Xác nhận
                </Button> */}
        </DialogActions>
      </Dialog>
    );
  }
}

ProductCategoryDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  withToastManager(withStyles(styles)(withTranslation()(ProductCategoryDialog)))
);
