import gql from 'graphql-tag';


export default gql`
  mutation ChangeTaskStatus($taskID: ID, $status: String){
    changeTaskStatus(taskID: $taskID, status: $status) {
      id
    }
  }
`;
