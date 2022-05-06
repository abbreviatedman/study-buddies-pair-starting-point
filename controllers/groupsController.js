const express = require("express");

const groups = express.Router();

const {
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
} = require("../queries/groups.js");

const { getAllEvents, createEvent } = require("../queries/events.js");
const { dateTime } = require("../date-helper.js");
// Index of Groups
groups.get("/", async (req, res) => {
  const allGroups = await getAllGroups();
  if (allGroups[0]) {
    res.status(200).json(allGroups);
  } else {
    res.status(500).json({ error: error });
  }
});

// Index of Events associated with Groups
groups.get("/:id/events", async (req, res) => {
  const allEvents = await getAllEvents(req.params.id);
  try {
    if (allEvents[0]) {
      res.status(200).json(allEvents);
    } else {
      res.status(500).json({ error: "no events found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create Group
groups.post("/", async (req, res) => {
  try {
    const newGroup = await createGroup(req.body);
    res.status(200).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Sample create group data
// {
//   "name": "Physics Pals",
//   "main_focus": "Quantum Computing",
//   "contact_email": "phys_pals@gmail.com"
// }

// Create Event Associated with Group
groups.post("/:id/events", async (req, res) => {
  try {
    const newEvent = await createEvent(req.params.id, req.body);
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Sample Create data Associated with a Group
// {
//   "name": "The Quirks of Quarks",
//   "virtual_meeting_link": "https://zoom.com/9999",
//   "start_time": "2022-10-26T10:10:00.000Z",
//   "end_time": "2022-06-26T22:22:00.000Z",
//   "number_of_attendees": 70
// }
// Show
groups.get("/:id", async (req, res) => {
  try {
    const oneGroup = await getGroup(req.params.id);
    res.status(200).json(oneGroup);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Edit
groups.put("/:id", async (req, res) => {
  try {
    const updatedGroup = await updateGroup(req.params.id, req.body);
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = groups;
