import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Dialog, Transition } from '@headlessui/react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import api from '../../api';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const CalendarBoard = () => {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#2563eb');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        const fixedEvents = res.data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(fixedEvents);
      } catch (error) {
        console.error('Failed to get events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setIsOpen(true);
  };

  const handleAddEvent = async () => {
    if (!title || !selectedSlot) return;

    const newEvent = {
      title,
      start: selectedSlot.start,
      end: selectedSlot.end,
      color,
    };

    try {
      const res = await api.post('/events', newEvent);
      setEvents((prev) => [
        ...prev,
        {
          ...res.data,
          start: new Date(res.data.start),
          end: new Date(res.data.end),
        },
      ]);
      setTitle('');
      setColor('#2563eb');
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setColor(event.color);
    setIsEditOpen(true);
  };

  const handleUpdateEvent = async () => {
    try {
      const updated = {
        ...selectedEvent,
        title,
        color,
      };
      await api.put(`/events/${selectedEvent._id}`, updated);
      setEvents((prev) =>
        prev.map((evt) =>
          evt._id === updated._id ? { ...evt, title, color } : evt
        )
      );
      resetEditState();
    } catch (err) {
      console.error("Failed to update event", err);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/events/${selectedEvent._id}`);
      setEvents((prev) => prev.filter((evt) => evt._id !== selectedEvent._id));
      resetEditState();
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  const resetEditState = () => {
    setIsEditOpen(false);
    setSelectedEvent(null);
    setTitle('');
    setColor('#2563eb');
  };

  const ColoredEvent = ({ event }) => (
    <div className="text-white px-2 py-1 rounded" style={{ backgroundColor: event.color }}>
      {event.title}
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#0f0f0f] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">📅 Calendar</h2>
        <span className="text-sm text-gray-400">
          Today is {format(new Date(), 'eeee, MMMM d')}
        </span>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg bg-white text-black h-[85%]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleEditEvent}
          components={{ event: ColoredEvent }}
          style={{ height: '100%', padding: '1rem' }}
        />
      </div>

      {/* Add Event Modal */}
      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/50" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
              <Dialog.Title className="text-lg font-medium text-gray-900">Add Event</Dialog.Title>
              <div className="mt-2 space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full border rounded px-3 py-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div>
                  <label className="text-sm text-gray-700">Select Color:</label>
                  <input
                    type="color"
                    className="ml-2"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleAddEvent}
                >
                  Add
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* Edit Event Modal */}
      <Transition appear show={isEditOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={() => setIsEditOpen(false)}>
          <div className="fixed inset-0 bg-black/50" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
              <Dialog.Title className="text-lg font-medium text-gray-900">Edit Event</Dialog.Title>
              <div className="mt-2 space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full border rounded px-3 py-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div>
                  <label className="text-sm text-gray-700">Select Color:</label>
                  <input
                    type="color"
                    className="ml-2"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-between gap-2">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setIsEditOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleUpdateEvent}
                  >
                    Update
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CalendarBoard;
