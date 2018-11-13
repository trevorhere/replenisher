import gql from 'graphql-tag';

export default gql`
query List($listID:ID!){
    list(listID:$listID){
      id
      name
      notes
      feedback
      leader
      {
        id
        email
      }
      owner{
        id
        email
      }
      tasks
      {
        id
        content
        status
        rank
        duration
        notes
        feedback
        started
        finished
        creator{
          id
          email
        }
        owner{
          id
          email
        }
      }
    }
  }
`;