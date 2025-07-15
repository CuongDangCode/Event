import Event from '../models/eventModel.js';
import Registration from '../models/registrationModel.js';

export const listEvents = async (req, res) => {
  const events = await Event.find().lean();
  const studentId = req.session.user.id;

  const registrations = await Registration.find({ studentId });
  const registeredEventIds = registrations.map(r => r.eventId.toString());

  const eventsWithFlag = events.map(e => {
    return {
      ...e,
      alreadyRegistered: registeredEventIds.includes(e._id.toString())
    };
  });

  res.render('registerEvent', { events: eventsWithFlag, error: req.flash('error') });
};