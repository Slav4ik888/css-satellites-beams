import React, {useState} from 'react';
// import {Link} from 'react-router-dom';
import pt from 'prop-types';
import {connect} from 'react-redux';

import {getIsMap, getAllResultSats, getSelectConditionOffers, getCheckedSats} from '../../reducers/search/selectors';
import {ActionCreator} from '../../reducers/search/search';

import {addSpaceToNumber} from '../../utils/utils';
import {selectOffers} from './utils';


const OfferBox = ({isMap, allResultSats, checkedSats, selectConditionOffers, setChecked}) => {

  // Если карта не загружена
  if (!isMap) {
    return null;
  }

  // Из allResultSats убрать те которых нет среди выбранных
  let chSats = [];
  allResultSats.forEach((sat) => {
    if (checkedSats.length) {
      let res = checkedSats.find((it) => it === sat);
      if (res) {
        chSats.push(sat);
      }
    }
  });

  const sats = selectConditionOffers ? chSats : allResultSats;
  const offers = selectOffers(sats);

  // Если нет предложений
  if (!offers.length) {
    return null;
  }

  // Навели на Title
  const [hover, setHover] = useState(false);
  const handlePointerEnter = () => setHover(true);
  const handlePointerLeave = () => setHover(false);

  // Чекбокс
  const [check, setCheck] = useState(selectConditionOffers);
  const handleCheck = () => {
    setCheck(!check);
    setChecked();
  };

  return (
    <div className="offersBox"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="titleBox">
        {
          !hover &&
            <>
              <div className="title">ВАРИАНТЫ РЕШЕНИЙ</div>
              <div className="description">для выбранных координат</div>
              <div className="line"></div>
            </>
        }
        {
          hover &&
            <>
              <div className="offerCategory">СПУТНИКОВЫЕ VSAT КОМПЛЕКТЫ</div>
              <div className="description">подходящие под выбранные координаты</div>
              <div className="header">
                <div className="name">Наименование</div>
                <div className="saleNew">Купить</div>
                <div className="rent">В аренду</div>
              </div>
              <div className="line"></div>
            </>
        }
      </div>
      <div className="container">
        {offers.map((offer) => {
          return (
            <a href={offer.url} key={offer.id} target="_blank" rel="noreferrer">
              <div className="offerBox" >
                <div className="name">{offer.name}</div>
                {
                  hover &&
                  <>
                    <div className="saleNew">{addSpaceToNumber(offer.saleNew) + ` `}&#8381;</div>
                    {
                      offer.isRent
                        ? <div className="rent">{addSpaceToNumber(offer.rent) + ` `}&#8381;</div>
                        : <div className="rent">-</div>
                    }
                  </>
                }
              </div>
            </a>
          );
        })
        }
      </div>

      {
        hover &&
          <div className="footer">
            <input
              id="chSat"
              className="checkbox" type="checkbox"
              checked={check}
              onChange={handleCheck}
            />
            <label htmlFor="chSat">
              <div className="checkTitle">
                Только для выбранных спутников
              </div>
            </label>
          </div>
      }

    </div>
  );
};

OfferBox.propTypes = {
  isMap: pt.bool.isRequired,
  selectConditionOffers: pt.bool.isRequired,
  allResultSats: pt.array.isRequired,
  checkedSats: pt.array.isRequired,
  setChecked: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  isMap: getIsMap(state),
  selectConditionOffers: getSelectConditionOffers(state),
  allResultSats: getAllResultSats(state),
  checkedSats: getCheckedSats(state),
});

const mapDispatchToProps = (dispatch) => ({
  setChecked() {
    dispatch(ActionCreator.setSelectConditionOffers());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(OfferBox);
