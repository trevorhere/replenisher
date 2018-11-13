import gql from 'graphql-tag';

export default gql`
 mutation CreateTask(
  $content:String,
  $listID:ID,
  $status: String,
  $creatorID: ID,
  $rank: String,
  $priority:String,
  $started:String,
  $finished:String,
  $duration:String,
  $notes:String

	){
  createTask(
    content:$content,
    listID:$listID,
    status: $status,
    creatorID: $creatorID,
  	rank: $rank,
  	priority:$priority,
  	started:$started,
  	finished:$finished,
  	duration:$duration,
  	notes:$notes
  	){
  	id
    name
    tasks{
      id
      content
      status
      notes

    }
  }
}
`;