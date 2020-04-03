export default (data) => data.reduce(
  ({ byId }, item) => {
    const { id } = item;
    return {
      byId: { ...byId, [id]: item },
    };
  },
  { byId: {} },
);
