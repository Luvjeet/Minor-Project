// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

import "../contracts/Voting.sol";

contract VotingTest {
    Voting votingToTest = new Voting(1672752871000, 1674912848000);

    function isEligibleVoter() public {
        votingToTest.isVoterEligible(765215083518) == true
            ? "Vote done"
            : "False";
    }

    function isUserVoted() public {
        votingToTest.vote(477304606429, 765215083518, 1649250142);
        // assert.equal(
        //     votingToTest.didCurrentVoterVoted(765215083518)[0], // Since this returns 2 params as an array
        //     true,
        //     "Luvjeet already casted his vote"
        // );
    }
}
