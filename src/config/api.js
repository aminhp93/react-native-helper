import PlatformAuth from "../utils/auth";
// import config from 'config';
import { Auth } from "aws-amplify";
import { buildParamList } from "../utils/url";

// const baseUrl = 'http://localhost:8000';
// const baseUrl = 'https://breezy-ape-33.localtunnel.me';
const baseUrl = "https://api.insightdatastaging.com";

export async function getHeaders() {
  try {
    console.log(10, PlatformAuth.isAuth());
    const session = await Auth.currentSession();
    const token = await session.idToken.jwtToken;
    // const token = 'eyJraWQiOiJ3bXhFQVBuWUZGUmRzckM5cjAwZE5MVk50VHhsU1Q5bGVoeEhiZ2pUMG8wPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1NmViZDI3ZS04MmRhLTRkNTAtYjkzOS1lZDAyYzdhMjJlYjkiLCJjb2duaXRvOmdyb3VwcyI6WyJwbGF0Zm9ybV9kZXYiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX2FRemJNdDZvNyIsImNvZ25pdG86dXNlcm5hbWUiOiI1NmViZDI3ZS04MmRhLTRkNTAtYjkzOS1lZDAyYzdhMjJlYjkiLCJnaXZlbl9uYW1lIjoiTWluaCIsImN1c3RvbTpsaW5rZWRpbiI6Imh0dHBzOlwvXC93d3cubGlua2VkaW4uY29tXC9pblwvbWluaHBoYW05M1wvIiwiYXVkIjoiN2UwZjk5NHFpbmU3Y3E0bTBzdTJlNTc4bmUiLCJldmVudF9pZCI6IjBlYmYzODc0LWJhMmQtNDJlNi05MTZjLTM2MmMzYmJlMjFhMyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTcwMDAzODAzLCJleHAiOjE1NzAwODI5MjQsImlhdCI6MTU3MDA3OTMyNCwiZmFtaWx5X25hbWUiOiJQaGFtIiwiZW1haWwiOiJtaW5oQGluc2lnaHRkYXRhc2NpZW5jZS5jb20ifQ.rQX8suG_qtUUHrFPyybnSPsYvuBDlq8MjSKWCMCIqwlMLNCz-9wKqK6W9HhbcqI3kP2EUEwMBvONTupnykWm4ogi6rjYmNNdW9EABSBy9xBA8IkfKCG3EI5FfeBKdxgN--Nm3DHNmDdyw34-5C02XtWHOYnWRPIrb9K5NJ5bD-z7w6N-vuRvi1ESvARfO9fWQ0wM3hW0LkGATMjPOzWOIDaSYShCQIEPuOHuyZLlcqAPYwZ26YEULZe8xcTr3YXExW9s6Eo6WNWXIcOCybCsIOsqoz3qQr8UjL9_wNDaKyu9SKG2LWXAdq4WCzEBPO49S4YoEacb51TBMEgBYyj2HA'
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: PlatformAuth.isAuth() ? `Bearer ${token}` : ""
    };
  } catch (err) {
    // eslint-disable-next-line
    // Rollbar.error('getHeaders error', err);
  }
}

export const ChatUrls = {
  getUsers: (ignoreUserIds, roles) =>
    `${baseUrl}/api/chat/users/?${buildParamList(
      "ids",
      ignoreUserIds
    )}&${buildParamList("roles", roles)}`,
  getConversations: teamId => `${baseUrl}/api/chat/conversations/`,
  getConversation: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/`,
  checkExistConversation11: (userId, andUserId) =>
    `${baseUrl}/api/chat/conversations/${userId}/${andUserId}`,
  getMessages: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/messages/`,
  createConversation: () => `${baseUrl}/api/chat/conversations/`,
  createMessage: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/messages/`,
  addParticipants: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/add-participants/`,
  removeParticipant: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/remove-participants/`,
  makeChannelAdmin: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/make-admin/`,
  removeChannelAdmin: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/remove-admin/`,
  leaveConversation: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/leave-conversation/`,
  changeConversationName: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/change-conversation-name/`,
  createThread: (conversationId, messageId) =>
    `${baseUrl}/api/chat/conversations/${conversationId}/messages/${messageId}/threads/`,
  createMessageInThread: (conversationId, threadId) =>
    `${baseUrl}/api/chat/conversations/${conversationId}/threads/${threadId}/messages/`,
  getMessagesInThread: (conversationId, threadId) =>
    `${baseUrl}/api/chat/conversations/${conversationId}/threads/${threadId}/messages/`,
  getThreadHistories: () => `${baseUrl}/api/chat/conversations/threads/`,
  getUnreadThreads: () => `${baseUrl}/api/chat/conversations/unread-threads/`,
  markThreadAsRead: () => `${baseUrl}/api/chat/conversations/unread-threads/`,
  addParticipantsToTeam: teamId =>
    `${baseUrl}/api/chat/teams/${teamId}/add-participants/`,
  createTeam: () => `${baseUrl}/api/chat/teams/`,
  getTeamList: () => `${baseUrl}/api/chat/teams/`,
  getParticipantsInTeam: teamId =>
    `${baseUrl}/api/chat/teams/${teamId}/participants/`,
  removeParticipantFromTeam: teamId =>
    `${baseUrl}/api/chat/teams/${teamId}/remove-participants/`,
  leaveTeam: teamId => `${baseUrl}/api/chat/teams/${teamId}/leave-team/`,
  makeTeamAdmin: teamId => `${baseUrl}/api/chat/teams/${teamId}/make-admin/`,
  removeTeamAdmin: teamId =>
    `${baseUrl}/api/chat/teams/${teamId}/remove-admin/`,
  getPublicChannels: teamId =>
    `${baseUrl}/api/chat/teams/${teamId}/public-channels/`,
  joinChannel: teamId => `${baseUrl}/api/chat/teams/${teamId}/join-channel/`,
  getNotifications: () => `${baseUrl}/api/chat/notifications/`,
  readMessage: messageId =>
    `${baseUrl}/api/chat/notifications/messages/${messageId}/read/`,
  deleteConversation: conversationId =>
    `${baseUrl}/api/chat/conversations/${conversationId}/delete-conversation/`,
  authPusher: () => `${baseUrl}/api/pusher/auth/`
};
