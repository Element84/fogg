# FOGG CHANGELOGG

## Unreleased

- updates axios @1.6.8 (CVE Q1 2024)
- updates changelogg™ format

## Version 0.5.1

- map supports editable layers

## Version 0.2.45
- adding UTC option to lens date components

## Version 0.2.44
- onkeydown example for form input
- onkeydown for modinput

## Version 0.2.43

## Version 0.2.42

## Version 0.2.41
- checking that results exists, providing backup defult if not

## Version 0.2.40
- removing footer from ui.js

## Version 0.2.39
- Removing filters for search results
- readme

## Version 0.2.38
- component story cleanup

## Version 0.2.37
- component story cleanup

## Version 0.2.36
- story documentation cleanup

## Version 0.2.35

## Version 0.2.34
- default resolve function to ersolve a non-search lookup
- using const to return instead of new object inf unction

## Version 0.2.33
- adding function that allows setting a tilelayer on the map with clear controls
- adding a function to allow clearing a tile layer by name
- contorlling check of item list

## Version 0.2.32
- removing yarn lock
- Revert "removing yarn lock"
- updating lens map to create a ref and feature group to be used for all map shapes without using state

## Version 0.2.31
- publish registry

## Version 0.2.30
- Tasking request cost component
- moving all components into their own directory with stories and tests
- adding button config options into task action component
- Checkbox fix for item list

## Version 0.2.29
- passing featuregroup through to clear layer handler
- clearing all feature groups of layers on unmount

## Version 0.2.28
- mouseenter instead of mouseover

## Version 0.2.27
- adding ability to create and keep track of feature groups for custom layer groups

## Version 0.2.26
- adding mouse events for itemlist

## Version 0.2.25
- setting up configurations to use adding and clearing shape

## Version 0.2.24
- adding initialState option to table

## Version 0.2.23
- fixing sort api for columns

## Version 0.2.22
- fixing table bug

## Version 0.2.21
- removing react-leaflet from null loader

## Version 0.2.20
- trying to fix undefined extend

## Version 0.2.19
- fixing L call outside of dom

## Version 0.2.18
- setting up shape additions to be added in an effect hook to allow consistent availability of the refMap

## Version 0.2.17
- fixing map draw test
- adding map state with initialized setting

## Version 0.2.16
- fixing geojson layer to respect layers inside object

## Version 0.2.15
- fixing bug where featuregroup wouldn't be avialable for clearing

## Version 0.2.14
- fixing bug where map would re-set the map coordinates on render

## Version 0.2.13
- preventing search input from firing if no search query or location, fixing map center fvrom geojson search

## Version 0.2.12
- fixing reset map view
- fixing shape options to work on draw controls

## Version 0.2.11
- hardening logic for handling clearing leaflet layers

## Version 0.2.10
- fixing layer add function bug

## Version 0.2.9
- valid leaflet check

## Version 0.2.8
- syncing state with zoom when user zooms on map

## Version 0.2.7
- fixing zoom option passthrough, fixing loading more results

## Version 0.1.197
- Tweaks to make table filters work with array fields
- Fix field logic

## Version 0.1.196

## Version 0.1.195

## Version 0.1.194
- Add validation message to FormInput

## Version 0.1.193
- Enabling date filtering for GeoJSON
- Adding debugging
- Debugging layers
- Removing logs
- Fixing filtering
- Removing isEqual check for layers
- Removing debugging

## Version 0.1.192
- adding prop to allow UTC on datetime

## Version 0.1.191
- Call onChange for select fields

## Version 0.1.190
- stray log

## Version 0.1.189

## Version 0.1.188
- deduping filters in panel by id
- upgrading packages

## Version 0.1.187
- adding purple

## Version 0.1.186
- new handler function to trigger a refresh of the active search with overrides, using it to load more results, passing it into the components
- reverting core-js

## Version 0.1.185
- adding a header to the search panel filters
- package upgrades

## Version 0.1.184
- extending map effect capabilities to add overlays

## Version 0.1.183
- clearing text input on layer created

## Version 0.1.182
- adding way to clear textinput for search

## Version 0.1.181
- adding textInput to sidebar component

## Version 0.1.180
- preventing immediate refire of effect

## Version 0.1.179
- dropping bounding box on map when search provides shapes, setting up custom zoom option, fixing linting issues
- bug

## Version 0.1.178
- dropping bounding box on map when search provides shapes, setting up custom zoom option, fixing linting issues
- Fix merge conflicts

## Version 0.1.177
- re-downgrading core-js due to jest tests

## Version 0.1.176
- removing log

## Version 0.1.175
- upgrade packages
- upgrade packages
- fixing zoom options
- fixing zoom options

## Version 0.1.174
- removing unneeded call to set view on map render

## Version 0.1.173
- fixing checked child toggle

## Version 0.1.172
- adding data checked to child toggle

## Version 0.1.171
- Allow search functionality with custom onCreated function
- fixing mobile and tweaking header tags

## Version 0.1.170
- adding method to refresh query params

## Version 0.1.169
- fixing range

## Version 0.1.168
- debouncing the form input of the range filter to avoid tons of updates in a row

## Version 0.1.167
- updating the input range to store a temporary value before committing to avoid constant update rerenders

## Version 0.1.166
- adding the ability to set up a range input and slider for filter properties
- cloud cover
- fixing range input to max of 2 decimal places?
- renaming float argument

## Version 0.1.165
- Remove subpixel-fix plugin
- Remove active area
- Revert flyTo > panTo
- Import leaflet-active-area
- Undo panTo revert
- Upgrade leaflet-active-area

## Version 0.1.164
- Change how layers are passed to getDataForLayers

## Version 0.1.163

## Version 0.1.162
- Add default date option to Lens
- Move defaultDate effect to LensSearchDate

## Version 0.1.161

## Version 0.1.160
- removing instance of urlsearchparam from app

## Version 0.1.159
- not rendering mapPreview if dom isn't available

## Version 0.1.158
- updating search marker to drop on useEffect

## Version 0.1.157
- proptype

## Version 0.1.156
- proptypes

## Version 0.1.155
- console logs

## Version 0.1.154
- Export saveFilterChanges
- Export handleUpdateSearchParams
- Add closeFilters param to saveFilterChanges
- Add hasFilterCancel option to Lens
- Update Lens stories

## Version 0.1.153
- updating zoom default for default story

## Version 0.1.152
- wrapping pixel fix with check to avoid buidl errors

## Version 0.1.151

## Version 0.1.150

## Version 0.1.149
- wrapping type check around dependent foreach

## Version 0.1.148
- wrapping type check around dependent foreach

## Version 0.1.147
- setting up field dependencies to run through validation method
- setting up form validation for dependnecies
- updating validation logic and checking dependent fields

## Version 0.1.146

## Version 0.1.145

## Version 0.1.144
- upgrading packages

## Version 0.1.143
- making clearable and searchable an option

## Version 0.1.142

## Version 0.1.141

## Version 0.1.140
- Lock react-table version
- Update filter table and remove unecessary components

## Version 0.1.139
- Update css, update useMemo dependencies
- Remove console log
- Don't render TableHead with empty headers

## Version 0.1.138
- Disabled date styles
- Reduce datepicker day border radius

## Version 0.1.137

## Version 0.1.136

## Version 0.1.135
- fixing mod form button list label styles

## Version 0.0.0
- adding modinputbuttonlist to ui exports

## Version 0.1.133

## Version 0.1.132
- Pull numberOfResults from lens object

## Version 0.1.131
- FD-212 Report to slack if teardown fails
- adding on change handler to child toggle

## Version 0.1.130

## Version 0.1.129

## Version 0.1.128
- adding custom icon capability to input button

## Version 0.1.127
- forwarding refs for input button
- FD-218 Synchronize stack functions

## Version 0.1.126
- not saving modinput value and reverting if value is empty

## Version 0.1.125
- adding download to whitelisted prop

## Version 0.1.124
- fixing forwardProps, adding tests for components

## Version 0.1.123
- updating map functions to use leaflet functionality instead of rerendering the map whenever the config changes
- fixing tests and naming ref forwarding

## Version 0.1.122
- wrapping function with type check, fixing centering of icon buttons

## Version 0.1.121

## Version 0.1.120

## Version 0.1.119

## Version 0.1.118

## Version 0.1.117

## Version 0.1.116

## Version 0.1.115
- adding navbar to list elements

## Version 0.1.114
- adding helper classes

## Version 0.1.113

## Version 0.1.112
- fixing navbar to recognize base path instead of exact match

## Version 0.1.111
- tweaking mod input for alignment

## Version 0.1.110

## Version 0.1.109

## Version 0.1.108
- Update order status download button
- Remove todo

## Version 0.1.107
- adding datalist capabilities to form inputs

## Version 0.1.106
- Log values
- Update defaultValue effect
- Update value when default changes

## Version 0.1.105
- Remove productIdentifer
- Fix failing test
- orderId and orderStaus > id and status

## Version 0.1.104

## Version 0.1.103
- upgrading package

## Version 0.1.102
- updating useForm to update rules on validate instnacE

## Version 0.1.101
- adding ability to add className to lens

## Version 0.1.100
- Update notice PropTypes for Layout
- adding ability to pass class on item list item

## Version 0.1.99
- empty copy for tasks and orders

## Version 0.1.98
- classname for orders and task lists

## Version 0.1.97
- empty orders and tasks lists

## Version 0.1.96
- adding icon configuration for item list

## Version 0.1.95
- setting up wonderlink to return a span if no to

## Version 0.1.94
- Add state to WonderLink ARGS_WHITELIST
- Fix Datetime value
- forminput stories initial value
- Set ReactDatetime defaultValue
- fixing field on form input stories

## Version 0.1.93

## Version 0.1.92

## Version 0.1.91

## Version 0.1.90

## Version 0.1.89

## Version 0.1.88

## Version 0.1.87

## Version 0.1.86

## Version 0.1.85
- FD-142 Point to the correct region for ECR
- Allow search on enter and fix location and filter logic
- Add empty line

## Version 0.1.84
- removing test snippet, fixing tests

## Version 0.1.83

## Version 0.1.82

## Version 0.1.81

## Version 0.1.80

## Version 0.1.79

## Version 0.1.78

## Version 0.1.77
- leaflet

## Version 0.1.76
- leaflet

## Version 0.1.75
- removing unused gatsby dependencis, downgrading gatsby

## Version 0.1.74
- fixing dependencies

## Version 0.1.73
- trying to change leaflet import method

## Version 0.1.72
- import order for map.js

## Version 0.1.71
- downgrading leaflet

## Version 0.1.70
- downgrading core-js to fix dependency issue

## Version 0.1.69
- package upgrades

## Version 0.1.68
- adding onclick to wonderlink whitelist

## Version 0.1.67
- Fix merge conflicts
- Query as defaultValue for input and update filter params
- updating logic to use reusable function. adding comments

## Version 0.1.66
- setting up the map component to allow to use an effect, setting an active area to position the marker offset by sidebar

## Version 0.1.65
- adding handler in fogg to support clearing a search

## Version 0.1.64
- exporting PanelActions

## Version 0.1.63

## Version 0.1.62
- Fixed merge conflict

## Version 0.1.61
- Preseve input when changing date
- Fix OrderList test
- JAM-70 Fix Cloudformation error

## Version 0.1.60

## Version 0.1.59
- storing previous path state in wonderlink state

## Version 0.1.58
- updating form to update rules validations if it exists instead of nothign at all

## Version 0.1.57
- adding geojson to lense sidebar component props

## Version 0.1.56
- testing commit
- setting name as id for input button if not available

## Version 0.1.55

## Version 0.1.54
- making child toggle default name to id if not set

## Version 0.1.53
- ui tweaks and configuration tweaks for filters
- fixing proptypes and tests

## Version 0.1.52
- navbar tweaks

## Version 0.1.51
- fixing table headers on components
- fixing table header tests

## Version 0.1.50
- package upgrades

## Version 0.1.49
- adding actions to the panel header ui

## Version 0.1.48

## Version 0.1.47
- oops fixing datetime test

## Version 0.1.46
- fixing datetimerange to pass number for time

## Version 0.1.45
- adding default value for tasks on tasklist

## Version 0.1.44

## Version 0.1.43
- Restructured TaskList to expect a dataset with a properties attribute
- Removed listType from URL path
- Added itemType back
- Changed absolute to relative paths
- Updated tests

## Version 0.1.42
- Resolve FD-108 "Feature/ access logs"

## Version 0.1.41
- adding tests for mapPreview

## Version 0.1.40
- forcing a map refresh if the map ID changes

## Version 0.1.39
- only appending new results in search if the page is greater than 1

## Version 0.1.38
- fixing load more results to reuse geojson instead of only center

## Version 0.1.37
- setting up atlas to have a load more results handler to pass down to the component

## Version 0.1.36

## Version 0.1.35
- adding ability to disable search

## Version 0.1.34
- fixing test

## Version 0.1.33
- adding story for no table columns

## Version 0.1.32
- only rendering table header if available

## Version 0.1.31
- patching in text input for search queries

## Version 0.1.30
- Update orders list to match schema
- Update OrderList storybook
- Update custom header

## Version 0.1.29

## Version 0.1.28

## Version 0.1.27

## Version 0.1.26
- refactoring map queries on atlas to support passing back different search handler options
- adding real result data to example, adding support for sublabels
- fixing geojson handling for search

## Version 0.1.25
- updating all component tests to point to root
- adding a ui export and updating all component tests to point to it
- updating all models to pull from root
- updating navbar test name

## Version 0.0.0
- updating readme
- updating jenkins namespace
- fixing fogg paths

## Version 0.1.23
- fixing panel from hiding autocomplete reesults, updating autocomplete query to cancel previous requests
- updating function names and adding some comments

## Version 0.1.22
- notifying slack on build succcess and failure
- fixing export name for wonderlink, changing lib exports to export all

## Version 0.1.21
- adding navbar to idnex exports
- small story change

## Version 0.1.20

## Version 0.1.19

## Version 0.1.18
- Fix merge conflict
- fixing button icons, updating modinput ui
- abstracting modinput logic into a hook
- Revert "Bumped version to 0.1.18"

## Version 0.1.17
- fixing styles for datetime range

## Version 0.1.16
- moving bump to dev dependencies

## Version 0.1.15
- moving esri and leaflet to dev dependencies
- updating search date box to collapse on search
- firing search handler on form submit

## Version 0.1.14

## Version 0.1.13

## Version 0.1.12
- Add force argument
- Change git command
- Give ssh key to git commands
- Safer git push

## Version 0.1.11

## Version 0.1.8
- Add a changelog

## Version 0.1.8

## Version 0.1.9
- Adding bump yarn package to increment version number for develop pipeline
- adding reference to bump in script
- adding step for automatic bumping
- Rules for when to merge + Jenkins identity
- Rules for when to merge + Jenkins identity
- Rules for when to merge + Jenkins identity

## Version 0.1.8
- adding testing to component library
- setting up basic form and inputs
- fixing package.json
- forms, inputs, stories for the both, linting
- css lint
- adding some tests and cleaning up functionality
- adding number and password input to stories
- working on adding more button attributes
- changed code for invalid to active
- adding build automation to component library
- moving jira ticket update to after bucket creation
- removing yarn test from precommit
- fixing bucket name
- setting up create bucket file to intake the bucket name to avoid ahving to write it twice
- commit to pass test
- fixing build script variable usage
- simplifying the button component, fixing button stories
- fixing teardown script bucket name
- updating jenkins teardown to lowercase target env
- fixed linter issues
- merging in develop
- removing console logs from button test, trying to fix create bucket script
- removing console logs from button test, trying to fix create bucket script
- cleaning up code
- adding code from remote repo
- setting up table component
- working on rendering tables
- updating table component, adding tests and stories
- adding story for table row
- padding table rows to match those that are longest in the event of misconfigured table. throwing warning in console if not production. set up tests to reflect
- padding table rows to match those that are longest in the event of misconfigured table. throwing warning in console if not production. set up tests to reflect
- updating package.json to run on all js staged instead of just src
- created files for story
- Users.js handles user data and UsersTable display user data in a table
- UsersTables renders correctly in storyboard
- made Users/UsersTable one file and added more user data to be closer to API return
- improved and cleaned up code
- working on adding test
- latest testing attempts
- story and test updates
- created initial files
- completed most of the react and storybook component
- working on date stuff
- added test
- added formatDate function, windowOpen and windowClose, and changed Task.js to TaskList.js
- added initial files
- built out react component
- moving formatDate function to a new lib file for reuse
- merging in develop
- merged in develop
- finished writing test
- deleted formatDate function and imported from lib
- Datepicker input with react-datetime
- Repeater field with hook and styles
- Tests for Repeater
- Pass props to icon and add tests
- Change Repeater to ChildToggle
- Override default form-row styles
- Fix merge conflict

## Version 0.1.7

## Version 0.1.6
- basic setup for storybook
- adding button component and styles to scaffold for testing purposes. still need to get SCSS support somehow
- scss support and global stylesheet
- temp removing wonderlinkg
- adding stories for all components
- moving storybook to dev dependency

## Version 0.1.5
- removing theme.css and theme.css.map

## Version 0.1.4

## Version 0.1.3

## Version 0.1.2
- package.json

## Version 0.1.1
- deleted prettier and added semistandard. also removed package-lock.json for yarn.lock
- removed husky hooks for now
- brought in and configured sass
- bringing in sass
- imported styling
- working on sass intergration
- created files to demo components
- initializing sass
- cleaning up
- clean up
- added information to view components
- fixed typo
- set up and cleaned up code to display components
- removed a line
- lint fixes, setting up settings all scss file
- nvmrc
- updating package name
- path prefix

## Version 0.1.0

## Version 0.0.0
- preparing to push

## Version 0.1.0

## Version 0.0.0
- Initial commit from gatsby: (https://github.com/gatsbyjs/gatsby-starter-default.git)
- made small changes
- got rid of initial stuff
- started building footer component
- created basic button component
- recycled code from e84-website-styles
