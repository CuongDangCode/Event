import Event from '../models/eventModel.js';
import Registration from '../models/registrationModel.js';

export const registerForEvent = async (req, res) => {
  const { eventId } = req.body;
  const event = await Event.findById(eventId);

  const alreadyRegistered = await Registration.findOne({
    studentId: req.session.user.id,
    eventId: eventId
  });

  if (alreadyRegistered) {
    req.flash('error', 'You have already registered for this event');
    return res.redirect('/events');
  }

  if (event.registered >= event.capacity) {
    req.flash('error', 'Event is full');
    return res.redirect('/events');
  }

  await Registration.create({
    studentId: req.session.user.id,
    eventId,
    registrationDate: new Date()
  });

  event.registered += 1;
  await event.save();
  res.redirect('/events');
};

export const cancelRegistration = async (req, res) => {
  const { eventId } = req.body;
  const registration = await Registration.findOneAndDelete({
    studentId: req.session.user.id,
    eventId: eventId
  });

  if (registration) {
    const event = await Event.findById(eventId);
    event.registered = Math.max(0, event.registered - 1);
    await event.save();
  }

  res.redirect('/events');
};

export const listRegistrations = async (req, res) => {
  const registrations = await Registration.find()
    .populate('studentId', 'username')
    .populate('eventId', 'name');
  res.render('listRegistrations', { registrations });
};


