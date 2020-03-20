import AddChannel from './AddChannel';
// import RenameChannel from './RenameChannel';
// import RemoveChannel from './RemoveChannel';

const mappingModalName = {
  addChannel: AddChannel,
  // renameChannel: RenameChannel,
  // removeChannel: RemoveChannel,
};

export default (typeModal) => mappingModalName[typeModal];
