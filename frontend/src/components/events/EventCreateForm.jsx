import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import eventService from '../../services/eventService';

const EventCreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: 50
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.maxAttendees) {
      newErrors.maxAttendees = 'Maximum attendees is required';
    } else if (parseInt(formData.maxAttendees) < 1) {
      newErrors.maxAttendees = 'Maximum attendees must be at least 1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const createdEvent = await eventService.createEvent({
        ...formData,
        maxAttendees: parseInt(formData.maxAttendees)
      });
      
      navigate(`/events/${createdEvent._id}`);
    } catch (err) {
      console.error('Event creation error:', err);
      setErrors({ 
        submit: err.response?.data?.message || 'Failed to create event' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{errors.submit}</p>
        </div>
      )}

      <Input
        label="Event Title"
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter event title"
        error={errors.title}
        required
      />
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`input ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Describe your event"
          required
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      
      <Input
        label="Date and Time"
        type="datetime-local"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
        required
      />
      
      <Input
        label="Location"
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Enter event location"
        error={errors.location}
        required
      />
      
      <Input
        label="Maximum Attendees"
        type="number"
        id="maxAttendees"
        name="maxAttendees"
        value={formData.maxAttendees}
        onChange={handleChange}
        placeholder="Enter maximum number of attendees"
        error={errors.maxAttendees}
        required
      />
      
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/events')}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
};

export default EventCreateForm;