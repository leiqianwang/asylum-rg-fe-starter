import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';
import { setVisualizationData } from '../../../state/actionCreators';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  //const { office, view: initialView } = useParams();
  //useEffect(() => {
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  // }, [view, set_view])

  // Determine the component to render based on the view and office
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  async function updateStateWithNewData(
    years,
    view,
    office,
    stateSettingCallback
  ) {
    let baseURL = 'https://hrf-asylum-be-b.herokuapp.com/cases';

    if (office === 'all' || !office) {
      let fiscal = await axios.get(`${baseURL}/fiscalSummary`, {
        params: {
          from: years[0],
          to: years[1],
        },
      });

      let citizenship = await axios.get(`${baseURL}/citizenshipSummary`, {
        params: {
          from: years[0],
          to: years[1],
        },
      });

      const combineData = {
        ...fiscal.data,
        citizenshipResults: citizenship.data,
      };
      console.log(combineData);
      stateSettingCallback(view, office, [combineData]);
    } else {
      let fiscal = await axios.get(`${baseURL}/fiscalSummary`, {
        params: {
          from: years[0],
          to: years[1],
          office: office,
        },
      });

      let citizenship = await axios.get(`${baseURL}/citizenshipSummary`, {
        params: {
          from: years[0],
          to: years[1],
          office: office,
        },
      });

      const combineData = {
        ...fiscal.data,
        citizenshipResults: citizenship.data,
      };
      console.log(combineData);
      stateSettingCallback(view, office, [combineData]);
    }

    /*
          _                                                                             _
        |                                                                                 |
        |   Example request for once the `/summary` endpoint is up and running:           |
        |                                                                                 |
        |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
        |                                                                                 |
        |     so in axios we will say:                                                    |
        |                                                                                 |     
        |       axios.get(`${url}/summary`, {                                             |
        |         params: {                                                               |
        |           from: <year_start>,                                                   |
        |           to: <year_end>,                                                       |
        |           office: <office>,       [ <-- this one is optional! when    ]         |
        |         },                        [ querying by `all offices` there's ]         |
        |       })                          [ no `office` param in the query    ]         |
        |                                                                                 |
          _                                                                             _
                                   -- Mack 
    
    */

    // if (view === 'time-series') {
    // endpoint = '/fiscalSummary';
    // } else {
    //   endpoint = '/citizenshipSummary';
    // }

    // if (office === 'all' || !office) {

    // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!

    // <-- `test_data` here can be simply replaced by `result.data` in prod!

    //.get(process.env.REACT_APP_API_URI, {
    // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
    // params: {
    //   from: years[0],
    //   to: years[1],
    //   office: office,
    // },
    // <-- `test_data` here can be simply replaced by `result.data` in prod!
  }

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
