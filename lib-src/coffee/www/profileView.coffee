# Licensed under the Apache License. See footer for details.

_ = require "underscore"

renderer = require "./renderProfileFlameGraph"

#-------------------------------------------------------------------------------
profileView = exports

#-------------------------------------------------------------------------------
profileView.show = (fileName, $scope, $http) ->

    id    = fileName.replace /\./g, "-"
    id    = "d-#{id}"
    idSel = "#" + id

    content$ = $ "#content"

    el$ = $ idSel, content$
    if el$.length
        $('html,body').animate
            scrollTop: el$.offset().top
        return

    el$ = $ """
        <div id="#{id}" class="chart prof">
            <i class="icon-trash pull-right"></i>
            <h2>profile #{fileName}</h2>
        </div>
    """
    content$.prepend el$

    #---------------------------------------------------------------------------
    trash$ = $ ".icon-trash", el$
    trash$.click ->
        el$.remove()

    #---------------------------------------------------------------------------
    httpResponse = $http.get "api/files/#{fileName}"

    httpResponse.success (data, status, headers, config) ->
        addChart idSel, data

    httpResponse.error (data, status, headers, config) ->
        $scope.error "error getting file #{fileName}: #{status}"

    return

#-------------------------------------------------------------------------------
addChart = (idSel, data) ->
    console.log "woulda added: ", data
    renderer.render idSel, data

#-------------------------------------------------------------------------------
# Copyright 2013 I.B.M.
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#    http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#-------------------------------------------------------------------------------
