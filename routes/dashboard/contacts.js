let express = require('express');

let passport 	= require( appRoot + '/passport');
let esi 		= require( appRoot + '/esi');
let models 		= require( appRoot + '/models/index');

let dashboard = require( './dashboardFunctions' );

let router = express.Router();

router.get('/:id/contacts', passport.auth(['isAltOfUser','pilotViewOthers']), function(req, res, next) {

    passport.findUser( req.params.id )
		.then(function( user ){
			return passport.refreshUser( user, true );
		})
		.then(function(user){
			res.locals.char = user;

			dashboard
				.getContacts( user )
				.then( contacts => res.render('dashboard/contacts', { contacts: contacts } ) );
		})
		.catch(function( err ){
			console.log( err.response );
			next();
		});
});

module.exports = router;