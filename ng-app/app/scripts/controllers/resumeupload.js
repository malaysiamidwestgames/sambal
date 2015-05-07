'use strict';

/**
 * @ngdoc function
 * @name midwestApp.controller:ResumeuploadCtrl
 * @description
 * # ResumeuploadCtrl
 * Controller of the midwestApp
 */
angular.module('midwestApp')
	.controller('ResumeuploadCtrl', ['$scope', '$upload', function ($scope, $upload) {
    /*$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });*/

     $scope.opportunitys = [
    {
      code: 1,
      text: 'Fulltime'
    },
    {
      code: 2,
      text: 'Internship'
    },
    {
      code: 3,
      text: 'Both'
    }
  	];

  	$scope.years = _.range(2015,2021);

  	$scope.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	$scope.majors = ["GENERAL AGRICULTURE","AGRICULTURE PRODUCTION AND MANAGEMENT","AGRICULTURAL ECONOMICS","ANIMAL SCIENCES","FOOD SCIENCE","PLANT SCIENCE AND AGRONOMY","SOIL SCIENCE","MISCELLANEOUS AGRICULTURE","FORESTRY","NATURAL RESOURCES MANAGEMENT","FINE ARTS","DRAMA AND THEATER ARTS","MUSIC","VISUAL AND PERFORMING ARTS","COMMERCIAL ART AND GRAPHIC DESIGN","FILM VIDEO AND PHOTOGRAPHIC ARTS","STUDIO ARTS","MISCELLANEOUS FINE ARTS","ENVIRONMENTAL SCIENCE","BIOLOGY","BIOCHEMICAL SCIENCES","BOTANY","MOLECULAR BIOLOGY","ECOLOGY","GENETICS","MICROBIOLOGY","PHARMACOLOGY","PHYSIOLOGY","ZOOLOGY","NEUROSCIENCE","MISCELLANEOUS BIOLOGY","COGNITIVE SCIENCE AND BIOPSYCHOLOGY","GENERAL BUSINESS","ACCOUNTING","ACTUARIAL SCIENCE","BUSINESS MANAGEMENT AND ADMINISTRATION","OPERATIONS LOGISTICS AND E-COMMERCE","BUSINESS ECONOMICS","MARKETING AND MARKETING RESEARCH","FINANCE","HUMAN RESOURCES AND PERSONNEL MANAGEMENT","INTERNATIONAL BUSINESS","HOSPITALITY MANAGEMENT","MANAGEMENT INFORMATION SYSTEMS AND STATISTICS","MISCELLANEOUS BUSINESS & MEDICAL ADMINISTRATION","COMMUNICATIONS","JOURNALISM","MASS MEDIA","ADVERTISING AND PUBLIC RELATIONS","COMMUNICATION TECHNOLOGIES","COMPUTER AND INFORMATION SYSTEMS","COMPUTER PROGRAMMING AND DATA PROCESSING","COMPUTER SCIENCE","INFORMATION SCIENCES","COMPUTER ADMINISTRATION MANAGEMENT AND SECURITY","COMPUTER NETWORKING AND TELECOMMUNICATIONS","MATHEMATICS","APPLIED MATHEMATICS","STATISTICS AND DECISION SCIENCE","MATHEMATICS AND COMPUTER SCIENCE","GENERAL EDUCATION","EDUCATIONAL ADMINISTRATION AND SUPERVISION","SCHOOL STUDENT COUNSELING","ELEMENTARY EDUCATION","MATHEMATICS TEACHER EDUCATION","PHYSICAL AND HEALTH EDUCATION TEACHING","EARLY CHILDHOOD EDUCATION","SCIENCE AND COMPUTER TEACHER EDUCATION","SECONDARY TEACHER EDUCATION","SPECIAL NEEDS EDUCATION","SOCIAL SCIENCE OR HISTORY TEACHER EDUCATION","TEACHER EDUCATION: MULTIPLE LEVELS","LANGUAGE AND DRAMA EDUCATION","ART AND MUSIC EDUCATION","MISCELLANEOUS EDUCATION","LIBRARY SCIENCE","ARCHITECTURE","GENERAL ENGINEERING","AEROSPACE ENGINEERING","BIOLOGICAL ENGINEERING","ARCHITECTURAL ENGINEERING","BIOMEDICAL ENGINEERING","CHEMICAL ENGINEERING","CIVIL ENGINEERING","COMPUTER ENGINEERING","ELECTRICAL ENGINEERING","ENGINEERING MECHANICS PHYSICS AND SCIENCE","ENVIRONMENTAL ENGINEERING","GEOLOGICAL AND GEOPHYSICAL ENGINEERING","INDUSTRIAL AND MANUFACTURING ENGINEERING","MATERIALS ENGINEERING AND MATERIALS SCIENCE","MECHANICAL ENGINEERING","METALLURGICAL ENGINEERING","MINING AND MINERAL ENGINEERING","NAVAL ARCHITECTURE AND MARINE ENGINEERING","NUCLEAR ENGINEERING","PETROLEUM ENGINEERING","MISCELLANEOUS ENGINEERING","ENGINEERING TECHNOLOGIES","ENGINEERING AND INDUSTRIAL MANAGEMENT","ELECTRICAL ENGINEERING TECHNOLOGY","INDUSTRIAL PRODUCTION TECHNOLOGIES","MECHANICAL ENGINEERING RELATED TECHNOLOGIES","MISCELLANEOUS ENGINEERING TECHNOLOGIES","MATERIALS SCIENCE","NUTRITION SCIENCES","GENERAL MEDICAL AND HEALTH SERVICES","COMMUNICATION DISORDERS SCIENCES AND SERVICES","HEALTH AND MEDICAL ADMINISTRATIVE SERVICES","MEDICAL ASSISTING SERVICES","MEDICAL TECHNOLOGIES TECHNICIANS","HEALTH AND MEDICAL PREPARATORY PROGRAMS","NURSING","PHARMACY PHARMACEUTICAL SCIENCES AND ADMINISTRATION","TREATMENT THERAPY PROFESSIONS","COMMUNITY AND PUBLIC HEALTH","MISCELLANEOUS HEALTH MEDICAL PROFESSIONS","AREA ETHNIC AND CIVILIZATION STUDIES","LINGUISTICS AND COMPARATIVE LANGUAGE AND LITERATURE","FRENCH GERMAN LATIN AND OTHER COMMON FOREIGN LANGUAGE STUDIES","OTHER FOREIGN LANGUAGES","ENGLISH LANGUAGE AND LITERATURE","COMPOSITION AND RHETORIC","LIBERAL ARTS","HUMANITIES","INTERCULTURAL AND INTERNATIONAL STUDIES","PHILOSOPHY AND RELIGIOUS STUDIES","THEOLOGY AND RELIGIOUS VOCATIONS","ANTHROPOLOGY AND ARCHEOLOGY","ART HISTORY AND CRITICISM","HISTORY","UNITED STATES HISTORY","COSMETOLOGY SERVICES AND CULINARY ARTS","FAMILY AND CONSUMER SCIENCES","MILITARY TECHNOLOGIES","PHYSICAL FITNESS PARKS RECREATION AND LEISURE","CONSTRUCTION SERVICES","ELECTRICAL, MECHANICAL, AND PRECISION TECHNOLOGIES AND PRODUCTION","TRANSPORTATION SCIENCES AND TECHNOLOGIES","MULTI/INTERDISCIPLINARY STUDIES","COURT REPORTING","PRE-LAW AND LEGAL STUDIES","CRIMINAL JUSTICE AND FIRE PROTECTION","PUBLIC ADMINISTRATION","PUBLIC POLICY","N/A (less than bachelor's degree)","PHYSICAL SCIENCES","ASTRONOMY AND ASTROPHYSICS","ATMOSPHERIC SCIENCES AND METEOROLOGY","CHEMISTRY","GEOLOGY AND EARTH SCIENCE","GEOSCIENCES","OCEANOGRAPHY","PHYSICS","MULTI-DISCIPLINARY OR GENERAL SCIENCE","NUCLEAR, INDUSTRIAL RADIOLOGY, AND BIOLOGICAL TECHNOLOGIES","PSYCHOLOGY","EDUCATIONAL PSYCHOLOGY","CLINICAL PSYCHOLOGY","COUNSELING PSYCHOLOGY","INDUSTRIAL AND ORGANIZATIONAL PSYCHOLOGY","SOCIAL PSYCHOLOGY","MISCELLANEOUS PSYCHOLOGY","HUMAN SERVICES AND COMMUNITY ORGANIZATION","SOCIAL WORK","INTERDISCIPLINARY SOCIAL SCIENCES","GENERAL SOCIAL SCIENCES","ECONOMICS","CRIMINOLOGY","GEOGRAPHY","INTERNATIONAL RELATIONS","POLITICAL SCIENCE AND GOVERNMENT","SOCIOLOGY","MISCELLANEOUS SOCIAL SCIENCES"];
 
	$scope.res = {};

	$scope.val = 0;
/*
$scope.upload = function (files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        $scope.upload = $upload.upload({
            url: 'server/upload/url',
            method: 'POST',
            fields: { 'user[name]': $scope.name }
            file: file,
            fileFormDataName: 'user[image]'
        });
    }
}*/

$scope.upload = function (files) {
		console.log('bab');
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var ayam = files[i];
                $upload.upload({
            	url: '/api/resumes',
            method: 'POST',
            fields: { 'resume[opportunity]': $scope.res.opportunity,
            		  'resume[month]': $scope.res.month,
            		  'resume[year]': $scope.res.year,
            		  'resume[major]': $scope.res.major },
            file: ayam,
            fileFormDataName: 'resume[image]'
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' +
                                evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' +
                                JSON.stringify(data));
                });
            }
        }
    };
}]);
/*    $scope.upload = function (files) {
    	console.log('babi');
        if (files && files.length) {
        	console.log('makan');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
             $scope.upload = $upload.upload({
            url: '/api/resumes',
            method: 'POST',
            fields: { 'resume[opportunity]': $scope.res.opportunity,
            		  'resume[month]': $scope.res.month,
            		  'resume[year]': $scope.res.year,
            		  'resume[major]': $scope.res.major }
            file:file,
            fileFormDataName: 'resume[image]'
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' +
                                evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' +
                                JSON.stringify(data));
                });
            }
        }
    };*/
