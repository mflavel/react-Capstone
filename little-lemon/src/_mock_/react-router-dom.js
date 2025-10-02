module.exports = {
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/conformation",
    state: {
      date: "2025-10-10",
      time: "18:00",
      guests: 4,
      occasion: "Birthday",
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    },
  }),
  useNavigate: () => jest.fn(),
};
