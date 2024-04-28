# Build Sprint 2

To begin work on this ticket, make sure you have finished: 
1. Getting locally setup. 
2. Completed the `Onboarding Module` in your course. 
3. Completed Build Sprint 1. 

### Objective

Deliver the following: 

- Integrate this frontend application with an API. 
- Rework the `GraphWrapper.jsx` file and data visualizations to use an API instead of `test_data.json`.
- The graphs on the Graphs page should display after the integration.

### Relevant Files

You must inspect the code in `src/components/pages/DataVisualizations`, `src/data`, and `src/state` to ensure that the application is pulling data from an API and not the dummy data file. Specifically, ONLY MAKE CHANGES in `GraphWrapper.jsx`.

### Guidance

Widely used applications use robust APIs to get data. It is your job to integrate the provided API into this application and ensure everything works properly after integration. 

> API LINK: https://hrf-asylum-be-b.herokuapp.com/cases

Endpoints: 

- Fiscal Year Data: `/fiscalSummary`
   test_data.json is an array that contains a single object. This fiscalSummary data represents the single object inside the data array.
- Citizenship Data: `/citizenshipSummary`
   `CitizenshipSummary` contains data that needs to be stored as the value of key called `citizenshipResults`. We need to inject this key/value 
   pair into the `fiscalSummary` data.
         
[   //We need to create this array
     {      //This is our fiscalSummary data
        "granted": 24.373156706704233,
        "adminClosed": 20.79086550343532,
        "denied": 54.568072100571726,
        "closedNacaraGrant": 0.17893332015224162,
        "asylumTerminated": 0.08897236913647373,
        "totalCases": 303465,
        "yearResults": [
         ...   
        ],
        "citizenshipResults": [    //This is our citizenshipSummary 
            ...
        ],
     }
]


If you look at `src/data/text_data.json`, there are 2 JSON blobs(google the definition of JSON blob), 1 for fiscal year data and the other for citizenship data. Study the differences in the structure of the data in `src/data/text_data.json` and the given endpoints thoroughly.  

> The graphs on the Graphs page should render correctly **AFTER** a successful API integration. 

You must: 

1. Ensure everything is working properly **AFTER** the API integration. Components should render correctly and show the data the same way they did before. (NOTE: Components may not render correctly before the integration.)

2. Make this project your own, but keep the integrity of the main files so that the app can render and work when you wish to present it. 

## Deliverables 

Submit the following in your course: 

- Link to your forked repo with the fixed code for the graphs page
- Link to a Loom video answering the prompt in the `Submit Your Deliverables` assignment in your course


