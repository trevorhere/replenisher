import gql from 'graphql-tag';

export default gql`
query Task($taskID:ID!){
  task(taskID:$taskID){
    id
    content
    status
    priority
    rank
    durationHours
    durationMinutes
    notes
    feedback
    started
    finished

  }
}
`;