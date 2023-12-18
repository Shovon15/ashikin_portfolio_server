const sendEmailWithNodeMailer = require("../helper/email");
const Invitation = require("../models/invitationModel");
const User = require("../models/userModel");
const { clientUrl } = require("../secret");
const { successResponse } = require("./responseController");
const createError = require("http-errors");

const createInvitation = async (req, res, next) => {
	try {
		const { name, phone, organizationName, location, eventText, audienceNumber } = req.body;

		if (!/^\d{11}$/.test(phone)) {
			throw createError(404, "Invalid phone number, must be a number with exactly 11 digits");
		}

		const newInvitation = await Invitation.create({
			name,
			phone,
			organizationName,
			location,
			eventText,
			audienceNumber,
		});

		const adminUser = await User.findOne({ isAdmin: true });
		console.log(adminUser);
		if (adminUser) {
			const emailData = {
				email: adminUser.email,
				subject: `You Have an Invitation Email from ${name}`,
				html: `<!DOCTYPE html>
		        <html lang="en">

		        <head>
		            <meta charset="UTF-8">
		            <meta name="viewport" content="width=device-width, initial-scale=1.0">
		            <style>

		                body {
		                    font-family: Arial, sans-serif;
		                    padding: 20px;
		                }

		                table {
		                    width: 100%;
		                    border-collapse: collapse;
		                    margin-top: 20px;
		                }

		                th, td {
		                    border: 1px solid #dddddd;
		                    text-align: left;
		                    padding: 8px;
		                }

		                th {
		                    background-color: #324de6;
		                    color: #f5f6fa;
		                    max-width: 100px;
		                }

		                td.bold-text {
		                    font-weight: 600;
		                }

		            </style>
		        </head>

		        <body>
		            <h2>Hello ${adminUser.name}, you have an invitation!</h2>

		            <table>
		                <tr>
		                    <th>Name</th>
		                    <td class="bold-text">${name}</td>
		                </tr>
		                <tr>
		                    <th>Organization Name</th>
		                    <td class="bold-text">${organizationName}</td>
		                </tr>
		                <tr>
		                    <th>Phone</th>
		                    <td>${phone}</td>
		                </tr>

		                <tr>
		                    <th>Location</th>
		                    <td>${location}</td>
		                </tr>
		                <tr>
		                    <th>Audience Number</th>
		                    <td>${audienceNumber}</td>
		                </tr>
		                <tr>
		                    <th>Event Text</th>
		                    <td>${eventText}</td>
		                 </tr>
		            </table>
                    <h3 style="text-align: center; padding: 5px 0;">Want to see this invitation in your website? <a href="${clientUrl}/dashboard/invitations/${newInvitation._id}" target="_blank" style="color: white; text-decoration: none; background-color: blue; padding: 5px 10px; border-radius: 5px;">click here</a></h3>
		        </body>

		        </html>`,
			};

			try {
				await sendEmailWithNodeMailer(emailData);
			} catch (error) {
				next(createError(500, "Failed to send Invitation email"));
				return;
			}
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Invitation sent successfully",
		});
	} catch (error) {
		next(error);
	}
};

const getInvitation = async (req, res, next) => {
	try {
		const invitations = await Invitation.find();

		return successResponse(res, {
			statusCode: 200,
			message: "get Invitation successfully",
			payload: {
				invitations,
			},
		});
	} catch (error) {
		next(error);
	}
};
const getInvitationById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const invitations = await Invitation.findOne({ _id: id });

		return successResponse(res, {
			statusCode: 200,
			message: "get Invitation by id successfully",
			payload: {
				invitations,
			},
		});
	} catch (error) {
		next(error);
	}
};
const deleteInvitationById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const invitation = await Invitation.findOne({ _id: id });

		// Check if the invitation exists
		if (!invitation) {
			throw createError(404, "Invitation not found.");
		}

		await Invitation.findByIdAndDelete({
			_id: id,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Invitation delete successfully",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { createInvitation, getInvitation, getInvitationById, deleteInvitationById };
