import gql from 'graphql-tag';


export default gql`
  mutation TaskCompleted($taskID: ID){
    taskCompleted(taskID: $taskID) {
      id
    }
  }
`;
