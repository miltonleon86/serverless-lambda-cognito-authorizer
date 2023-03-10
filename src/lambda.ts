import {CognitoJwtVerifier} from "aws-jwt-verify";
const jwt = require('jsonwebtoken');

console.log('Loading jwtAuthorizer');

exports.handler = async function (event, context, callback) {
	console.log("Received event: " + JSON.stringify(event));
	const token = event.headers.authorization;

	// Verifier that expects valid access tokens:
	const verifier = CognitoJwtVerifier.create({
		userPoolId: "XXX",
		tokenUse: "access",
		clientId: "XXX",
	});

	try {
		const payload = await verifier.verify(
			token // the JWT as string
		);
		console.log("Token is valid. Payload:", payload);

		return {
			"isAuthorized": true,
			"context": {
				"stringKey": "value",
				"numberKey": 1,
				"booleanKey": true,
				"arrayKey": ["test", "test1"],
				"mapKey": {"test2": "test3"}
			}
		};

	} catch {
		console.log("Token not valid!");
		return {
			"isAuthorized": true,
			"context": {
				"stringKey": "value",
				"numberKey": 1,
				"booleanKey": true,
				"arrayKey": ["test", "test1"],
				"mapKey": {"test2": "test3"}
			}
		};
	}
};
