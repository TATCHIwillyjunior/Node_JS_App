let events = [
  { id: 1, title: "Web Development Workshop", description: "Learn advanced web dev", location: "New York", startDate: "2025-12-01", startTime: "10:00", endDate: "2025-12-01", endTime: "16:00", attendees: 45, capacity: 100 },
  { id: 2, title: "Tech Conference 2025", description: "Annual tech conference", location: "San Francisco", startDate: "2025-12-15", startTime: "09:00", endDate: "2025-12-17", endTime: "17:00", attendees: 500, capacity: 1000 },
  { id: 3, title: "Networking Meetup", description: "Meet fellow developers", location: "Boston", startDate: "2025-11-25", startTime: "18:00", endDate: "2025-11-25", endTime: "20:00", attendees: 35, capacity: 50 },
];

export const getAllEvents = (req, res) => {
  res.json({ data: events });
};

export const getEventById = (req, res) => {
  const id = Number(req.params.id);
  const event = events.find((e) => e.id === id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
};

export const createEvent = (req, res) => {
  const { title, description, location, startDate, startTime, endDate, endTime, capacity } = req.body;
  if (!title || !description || !location || !startDate || !startTime || !endDate || !endTime || capacity === undefined) {
    return res.status(400).json({ error: "Missing required fields: title, description, location, startDate, startTime, endDate, endTime, capacity" });
  }
  const newEvent = { 
    id: Math.max(...events.map(e => e.id), 0) + 1, 
    title, 
    description, 
    location, 
    startDate, 
    startTime, 
    endDate, 
    endTime, 
    attendees: 0, 
    capacity 
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
};

export const updateEvent = (req, res) => {
  const id = Number(req.params.id);
  const eventIndex = events.findIndex((e) => e.id === id);
  if (eventIndex === -1) return res.status(404).json({ error: "Event not found" });
  
  const { title, description, location, startDate, startTime, endDate, endTime, attendees, capacity } = req.body;
  events[eventIndex] = { 
    id, 
    title: title || events[eventIndex].title, 
    description: description || events[eventIndex].description, 
    location: location || events[eventIndex].location, 
    startDate: startDate || events[eventIndex].startDate, 
    startTime: startTime || events[eventIndex].startTime, 
    endDate: endDate || events[eventIndex].endDate, 
    endTime: endTime || events[eventIndex].endTime, 
    attendees: attendees !== undefined ? attendees : events[eventIndex].attendees,
    capacity: capacity !== undefined ? capacity : events[eventIndex].capacity
  };
  res.json(events[eventIndex]);
};

export const deleteEvent = (req, res) => {
  const id = Number(req.params.id);
  const eventIndex = events.findIndex((e) => e.id === id);
  if (eventIndex === -1) return res.status(404).json({ error: "Event not found" });
  
  const deletedEvent = events.splice(eventIndex, 1);
  res.json({ message: "Event deleted", event: deletedEvent[0] });
};

export const getUpcomingEvents = (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const upcoming = events.filter((e) => e.startDate >= today).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  res.json({ data: upcoming });
};