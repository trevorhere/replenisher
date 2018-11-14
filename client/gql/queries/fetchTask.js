import gql from 'graphql-tag';

export default gql`
query Task($taskID:ID!){
  task(taskID:$taskID){
    id
    content
    status
    priority
    rank
    timeDue
    dueDate
    durationHours
    durationMinutes
    notes
    feedback
    started
    finished

  }
}
`;