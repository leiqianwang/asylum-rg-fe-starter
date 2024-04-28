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

  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    let baseURL = 'https://hrf-asylum-be-b.herokuapp.com/cases';
    let endpoint = '';

    // Determin which endpoint to use based on the view
    if (view === 'time-series') {
      endpoint = '/fiscalSummary';
    } else {
      endpoint = '/citizenshipSummary';
    }

    //Setup parameters for the API call
    const params = {
      from: years[0],
      to: years[1],
      ...(office && { office }), // If an office is specified, add it to the parameters
    };

    //Perform the local API call by using callback function stateSettingCallback
    axios
      .get(`${baseURL}${endpoint}`, { params })
      .then(response => {
        //Pass fetched data to the callback to update state accordingly
        stateSettingCallback(response.data);
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
      });
  }

  // useEffect(() => {
  //   if(!years || !views) return;
  //   updateStateWithNewData(years, view, office, handleFetchedData);

  // }, [years, view, office, handleFetchedData]);

  //     useEffect(() => {
  //       if (!view) return; // Ensure we have a valid view before fetching data

  //       const baseURL = "https://hrf-asylum-be-b.herokuapp.com/cases";
  //       const endpoint = view === 'citizenship' ? '/citizenshipSummary' : '/fiscalSummary';
  //       const params = {
  //           from: 2015,  // Start year, presumably needs to be dynamic based on user input
  //           to: 2022,    // End year, same as above
  //           ...(office && { office })  // Include office in the parameters if specified
  //       };

  //       axios.get(`${baseURL}${endpoint}`, { params })
  //           .then(response => {
  //               // Dispatch the fetched data to the Redux store
  //               dispatch(setVisualizationData(view, office, response.data));
  //           })
  //           .catch(error => {
  //               console.error('Failed to fetch data:', error);
  //           });

  //   }, [dispatch, view, office]);  // Dependencies for useEffect

  //   return null;  // This component does not render anything itself
  // }

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

  //   if (office === 'all' || !office) {
  //     axios
  //       .get(process.env.REACT_APP_API_URI, {
  //         // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
  //         params: {
  //           from: years[0],
  //           to: years[1],
  //         },
  //       })
  //       .then(result => {
  //         stateSettingCallback(view, office, test_data); // <-- `test_data` here can be simply replaced by `result.data` in prod!
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   } else {
  //     axios
  //       .get(process.env.REACT_APP_API_URI, {
  //         // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
  //         params: {
  //           from: years[0],
  //           to: years[1],
  //           office: office,
  //         },
  //       })
  //       .then(result => {
  //         stateSettingCallback(view, office, test_data); // <-- `test_data` here can be simply replaced by `result.data` in prod!
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   }
  // }

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
